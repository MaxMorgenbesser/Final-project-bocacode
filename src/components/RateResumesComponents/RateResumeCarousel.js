import { Button, Carousel, Input } from "antd";
import { useEffect, useState } from "react";
import "./RateResumeCss.css";
const contentStyle = {
  height: "1600px",
  lineHeight: "160px",
  color: "blue",
  textAlign: "center",
  background: "#364d79",
};

export default function RateResumeCarousel() {
  const [resumes, setResumes] = useState("");
  const [score, setScore] = useState(null);
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const updateRes = (id, userGrade) => {
    console.log(id, userGrade);

    fetch(`https://final-api-mam.web.app/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ score: userGrade, responses:1 }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch("https://final-api-mam.web.app/getresumes")
      .then((res) => res.json())
      .then((data) => {
        setResumes(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleScoreButton(id, score) {
    updateRes(id, score);
    setScore("");
    console.log(id, score);
  }
  if (resumes) {
    console.log(resumes);
    return (
      <Carousel afterChange={onChange}>
        {resumes.map((resume) => {
          return (
            <div key={resume._id}>
              <h3>Score the resume between 1 and 100</h3>
              <Input
                max="100"
                min="-1"
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
              ></Input>
              {score > 0 && score <= 100 && (
                <Button
                  onClick={() => handleScoreButton(resume._id, Number(score))}
                >
                  Submit
                </Button>
              )}
              <embed
                src={resume.filebase64}
                width="100%"
                height="200px"
                style={contentStyle}
              />
            </div>
          );
        })}
      </Carousel>
    );
  } else {
    return <h1>No resumes to rate at the moment </h1>;
  }
}
