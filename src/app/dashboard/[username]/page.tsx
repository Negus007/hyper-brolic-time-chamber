"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

function groupByDay(d: any) {
  return d.reduce((result: any, exercise: any) => {
    const { day } = exercise;

    if (!result[day]) {
      result[day] = [];
    }

    result[day].push(exercise);

    return result;
  }, {});
}

export default function DashboardPage() {
  const [program, setProgram] = useState([]);
  const [index, setIndex] = useState(1);
  const { username } = useParams();
  console.log(username);
  const arr = { username };
  const increaseDays = () => {
    setIndex((oldIndex: number) => oldIndex + 1);
  };
  const decreaseDays = () => {
    setIndex((oldIndex: number) => oldIndex - 1);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.post(`/api/${username}`, arr);
      const day1 = groupByDay(response.data.user);

      console.log(day1[`Day ${index}`]);
      console.log(response.data.user);
      setProgram(day1);
    };
    getData();
  }, []);

  return (
    <section className="bg-my-queen-black sm:h-screen ">
      <div className="flex flex-col items-center justify-center px-6 sm:h-screen py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex flex-row justify-between items-center mb-8">
          <div className="w-1/2 flex justify-center items-center h-full ">
            <div className="h-24 w-24 bg-gray-100 rounded-full"></div>
          </div>
          <div className="w-1/2">
            <h1 className="text-3xl">Hello {username}</h1>
            <p>"Motivation gets you going. Discipline keeps you growing"</p>
          </div>
        </div>

        <div className="w-full bg-my-queen-gray rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-between items-center">
              <div>
                <button onClick={decreaseDays}>{"<"}</button>
                <button onClick={increaseDays}>{">"}</button>
              </div>

              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {`Day ${index}`}
              </h1>
            </div>

            <div className="space-y-4 md:space-y-6 flex flex-col">
              {program[`Day ${index}`]?.map((each: any) => {
                console.log(each.video);
                return (
                  <>
                    <div className="flex flex-col items-center bg-white mb-2 rounded-lg py-2">
                      <h3 className="block mb-2 text-sm font-medium text-black">
                        {each.exercise_name}
                      </h3>
                      <p className="block mb-2 text-sm font-medium text-black">
                        {`${each.sets} x ${each.reps}`}
                      </p>
                      {/*<iframe
                        src="https://www.youtube.com/embed/eGo4IYlbE5g"
                        frameborder="0"
                        allow="autoplay; encrypted-media"
                        allowfullscreen
                        title="video"
                      />{" "}
*/}{" "}
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
