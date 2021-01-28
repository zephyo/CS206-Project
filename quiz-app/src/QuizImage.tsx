import React, { SyntheticEvent, useState } from "react";

interface Props {
    // image source url
    src: string;
    interactable?: boolean; 
    setAskForData?: (askForData: boolean) => void;
}

interface Coordinates {
    x: number;
    y: number;
}

// component to render an image and capture user's mouse coordinates
function QuizImage(props: Props) {

    const [coordinates, setCoordinates] = useState<Coordinates>({x: 0, y:0});

    const onMouseMove = (e: any) => {
        setCoordinates({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY});
    };

    const onClick = () => {
        // TODO: send the coordinates somewhere

        if (props.setAskForData)
            props.setAskForData(false);
    };
    return (<div className="question-image">
      {props.interactable &&  <h2>Tap the part that made you think that way.</h2>}
              <img src={props.src} 
              onMouseMove={onMouseMove}
              onClick={onClick}
              />
              <p>x: {coordinates.x}, y: {coordinates.y}</p>
          </div>);
}

QuizImage.defaultProps = {
    interactable: false,
    setAskForData: null
};

export default QuizImage;