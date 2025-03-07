import Title from "./Components/Title.jsx";
import Question from "./Components/Question.jsx";
import SpeechToText from "./Components/SpeechToText.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProblemSet from "./Components/ProblemSet.jsx";


function App() {
  return (
    <BrowserRouter>
      <main> 
        <Routes>
          <Route path="/" element={<Title />} /> 
          <Route path="problems" element={<ProblemSet />} />
          <Route path="question/:problemId" element={<Question />} />
          <Route path="speechtotext" element={<SpeechToText />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
