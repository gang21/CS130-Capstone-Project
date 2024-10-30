import TinderCard from "react-tinder-card";
import { Exercise } from "@shared_types";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../redux/hook";
import ApiSdk from "../api/apiSdk";

const onSwipe = (direction: string) => {
  console.log("You swiped: " + direction);
};

const onCardLeftScreen = () => {
  console.log("card left the screen");
};

// TODO: Polish this. See https://github.com/3DJakob/react-tinder-card-demo/blob/master/src/examples/Advanced.js
function PlayPage() {
  const [exercise, setExercise] = useState<Exercise>();
  const hasFetched = useRef(false);
  const api = new ApiSdk();
  const { token } = useAppSelector((state) => state.session);

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      api.getOneRandomExercise(token).then((exercise) => {
        setExercise(exercise);
        console.log(exercise);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <TinderCard
      onSwipe={onSwipe}
      onCardLeftScreen={onCardLeftScreen}
      preventSwipe={["down", "up"]}
    >
      <div
        style={{
          height: 500,
          backgroundImage:
            "url(https://basepaws.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fqj2yxv39d6ig%2F4XXFhU2WQtuORzIVqFvoay%2Fdda16ebb32a51db8a620aac1fb9ee5e7%2Fj45Rv.jpg%3Fw%3D755%26h%3D503%26q%3D80&w=1920&q=75)",
        }}
        className="card"
      >
        <h3>Hey</h3>
      </div>
    </TinderCard>
  );
}

export default PlayPage;
