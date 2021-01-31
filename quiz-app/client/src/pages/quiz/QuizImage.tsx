import React, { useEffect, useState } from "react";
import api from "../../api";
import Loading from "../../components/Loading";

interface Props {
  // image source id
  id: string;
  interactable?: boolean;
  setAskForCoords?: (askForCoords: boolean) => void;
  sendAnswer?: (coords: Coordinates) => void;
}

export interface Coordinates {
  x: number;
  y: number;
}

// component to render an image and capture user's mouse coordinates
function QuizImage(props: Props) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [clicked, setClicked] = useState<boolean>(false);
  const [coordinates, setCoordinates] = useState<Coordinates>({
    x: 0,
    y: 0,
  });

  const FetchData = async () => {
    await api.getPhotoById(props.id).then((results) => {
      console.log("img", results);
      setImgSrc(results.data.data.url);
    });
  };

  // on mount, fetch data
  useEffect(() => {
    FetchData();
  }, []);

  if (imgSrc == null) {
    return <Loading />;
  }

  const onMouseMove = (e: any) => {
    if (clicked == true) return;
    setCoordinates({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
  };

  const onClick = () => {
    if (props.interactable == false) return;
    // TODO: send the coordinates somewhere

    // show a circle around where you clicked
    setClicked(true);

    setTimeout(() => {
      if (props.setAskForCoords == null || props.sendAnswer == null)
        return;
      props.setAskForCoords(false);
      props.sendAnswer(coordinates);
      setClicked(false);
    }, 500);
  };

  return (
    <div className="question-image">
      {props.interactable && (
        <h2>Tap the part that made you think that way.</h2>
      )}
      <img src={imgSrc} onMouseMove={onMouseMove} onClick={onClick} />
      <p>
        x: {coordinates.x}, y: {coordinates.y}
      </p>
      <div
        className={"circle " + (clicked ? "show" : "hide")}
        style={{ top: coordinates.y, left: coordinates.x }}
      />
    </div>
  );
}

QuizImage.defaultProps = {
  interactable: false,
  setAskForData: null,
};

export default QuizImage;
