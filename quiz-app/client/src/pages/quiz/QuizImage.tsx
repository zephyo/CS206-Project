import React, { useEffect, useState } from "react";
import api from "../../api";
import Loading from "../../components/Loading";

interface Props {
  // image source id
  id: string;
  interactable?: boolean;
  setAskForData?: (askForData: boolean) => void;
}

interface Coordinates {
  x: number;
  y: number;
}

// component to render an image and capture user's mouse coordinates
function QuizImage(props: Props) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates>({
    x: 0,
    y: 0,
  });

  const FetchData = async () => {
    await api.getPhotoById(props.id).then((results) => {
      setImgSrc(results.data);
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
    setCoordinates({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
  };

  const onClick = () => {
    // TODO: send the coordinates somewhere

    if (props.setAskForData) props.setAskForData(false);
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
    </div>
  );
}

QuizImage.defaultProps = {
  interactable: false,
  setAskForData: null,
};

export default QuizImage;
