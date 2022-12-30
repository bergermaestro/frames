import { Stage, Layer, Rect, Circle, Image } from "react-konva";
import useImage from "use-image";

const Canvas = ({ matWidth, matColor, imageUrl, tMargin, rMargin, bMargin, lMargin }: { matWidth: number, matColor: string, imageUrl: string, tMargin: number, rMargin: number, bMargin: number, lMargin: number }) => {
  const Painting = () => {
    const [image] = useImage(imageUrl);
    return <Image image={image} width={843} x={lMargin} y={tMargin}/>;
  };

  const MatTexture = () => {
    const [matImage] = useImage("https://media.istockphoto.com/id/468422477/photo/seamless-felt-textured-paper-background.jpg?s=170667a&w=0&k=20&c=u3pcni7rG8Awe7DveGsH8O9hDf5jAAeg_MBHLbXUjDM=");
    return <Rect fillPatternImage={matImage} fillPatternScale={{ x: 0.6, y: 0.6 }} width={1000} height={1000}
                 globalCompositeOperation="multiply" opacity={0.8} />;
  };

  return (
    <Stage width={843 + lMargin + rMargin} height={843 + tMargin + bMargin}>
      <Layer>
        <Rect width={843  + lMargin + rMargin} height={843 + tMargin + bMargin} fill={matColor} />
        <MatTexture />
        <Painting />
      </Layer>
    </Stage>
  );
};

export default Canvas;