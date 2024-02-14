from flask import Flask, request, jsonify, render_template, send_file, send_from_directory

from openai import OpenAI
from pathlib import Path
from python_graphql_client import GraphqlClient
from flask_cors import CORS
from datetime import datetime



app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = Path(__file__).parent / 'static'

@app.route('/', methods = ['GET'])
def home():
    return jsonify({'Post': "Lol"})


@app.route('/fetchAudio', methods=['POST'] )
def fetchAudio():
    client = OpenAI(api_key="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")

    request_data = request.get_json()

    speech_file_path = Path(__file__).parent / "speech.mp3"
    response = client.audio.speech.create(
    model="tts-1",
    voice="alloy",
    input=f"{request_data['key1']}",
    )
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    # Save audio file to static folder
    audio_filename = "output.mp3"
    audio_path = app.config['UPLOAD_FOLDER'] / audio_filename
    response.stream_to_file(audio_path)

    # Return the file path or URL to the front end
    audio_url = f"/static/{audio_filename}"
    return {'audio_url': audio_url}


@app.route('/fetchOpenAI', methods=['GET', 'POST'])
def fetchOpenAI():
    if request.method == 'POST':
        client = OpenAI(api_key="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")
        
        request_data = request.get_json()
        key1 = request_data.get('key1', '')  # Default value if key1 is not provided
        key2 = request_data.get('key2', '')  # Default value if key2 is not provided
        key3 = request_data.get('key3', '')  # Default value if key3 is not provided
        key4 = request_data.get('key4', '')  # Default value if key4 is not provided

        completion = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": f"""You are a interviewer, named Chatty, for a software engineering position, you are trying to guide them to the solution 
                 {key4} which is: 

                {key3}


                They are coding in Python.
                Keep it short and don't reveal the full answer
                Don't reveal the full answer if they explain their thought proccess, just give them a hint towards the right direction if they're solution isn't efficent, else just say they are correct. 
                 If they are asking for help with syntax provide the correct syntax don't give them examples though of how to use it. If they show you the final code check for syntax and logical mistakes, if they made a mistake point it out but don't tell them how to fix it, if the code works tell them that it lookes good and the interview is concluded. 
                 Limit to one to two sentences   
                """ },
                {"role": "user", "content": f""" {key2}

                        {key1}"""}
            ]
        )

        response_data = {'': completion.choices[0].message.content}

        return jsonify(response_data)

    else:
        return 'Method Not Allowed', 405




        #return render_template("index.html", question=result, title=title_slug, snippet = snippet_code)
    # If the question data is not found, return a 404 error
@app.route('/<title_slug>', methods=['GET'])
def display_question(title_slug):
    title_fr = ''

    client_fetch = GraphqlClient(endpoint="https://leetcode.com/graphql/")
    query = """
query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
  problemsetQuestionList: questionList(
    categorySlug: $categorySlug
    limit: $limit
    skip: $skip
    filters: $filters
  ) {
    total: totalNum
    questions: data {
      titleSlug
    
    }
  }
}
"""


    variables = {
    "categorySlug":"",
    "skip":0,
    "filters":{}
}



    data = client_fetch.execute(query=query, variables=variables)
    # Find the question data corresponding to the given title slug
    
    for question in data['data']['problemsetQuestionList']['questions']:
        if question['titleSlug'] == title_slug:
            title = question['titleSlug']
            title_slug = question ['title']
            title_fr = question ['title']
        query2 = """
query questionContent($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    content
    mysqlSchemas
  }
}
"""
        variables2 = {
    "titleSlug":title_slug,
}


        data2 = client_fetch.execute(query=query2, variables=variables2)
        content = data2['data']['question']['content']

        lines = content.split('\n')

    # Wrap each line with a <div> tag with black text color
        result = ''
        for line in lines:

            result += f'<div style="color: white;">{line}</div>\n'


        snippet_query = """
query questionEditorData($titleSlug: String!) {
  question(titleSlug: $titleSlug) {
    questionId
    questionFrontendId
    codeSnippets {
      lang
      langSlug
      code
    }
    envInfo
    enableRunCode
  }
}
"""
        snippet_variables = {
    "titleSlug":title_slug,

}
        snippet_data = client_fetch.execute(query=snippet_query, variables=snippet_variables)

        snippet_code = (snippet_data['data']['question']['codeSnippets'][2]['code'])
        print (snippet_code)
        print ("lol")
            # Render the question template with the question data
        response_data = {
        "title_slug": title_slug,
        "snippet_code": snippet_code,
        "result": result
    }
        return jsonify(response_data)


        #return render_template("index.html", question=result, title=title_slug, snippet = snippet_code)
    # If the question data is not found, return a 404 error
@app.route('/problemset', methods=['GET'])
def display_question2():

    client_fetch_dash = GraphqlClient(endpoint="https://leetcode.com/graphql/")
    query_dash = """
query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
  problemsetQuestionList: questionList(
    categorySlug: $categorySlug
    limit: $limit
    skip: $skip
    filters: $filters
  ) {
    total: totalNum
    questions: data {
      titleSlug
      title
      difficulty
      topicTags {
          name
      }
    }
  }
}
"""


    variables_dash = {
    "categorySlug":"",
    "skip":0,
    "limit": 67,
    "filters":{}
}



    data_dash = client_fetch_dash.execute(query=query_dash, variables=variables_dash)
    # Find the question data corresponding to the given title slug
    print (data_dash['data']['problemsetQuestionList']['questions'])
    return data_dash['data']['problemsetQuestionList']['questions']

        #return render_template("index.html", question=result, title=title_slug, snippet = snippet_code)
    # If the question data is not found, return a 404 error


if __name__ == '__main__':
    app.run(debug = True, port = 8080)




