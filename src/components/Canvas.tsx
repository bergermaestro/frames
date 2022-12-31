import { Stage, Layer, Rect, Circle, Image, Line } from "react-konva";
import Konva from "konva";
import useImage from "use-image";

const Canvas = ({ matColor, imageUrl, tMargin, rMargin, bMargin, lMargin, imageDimensions }: { matColor: string, imageUrl: string, tMargin: number, rMargin: number, bMargin: number, lMargin: number, imageDimensions: { height:number, width:number } }) => {
  const Painting = () => {
    const [image] = useImage(imageUrl);
    return <Image image={image} width={imageDimensions.width} height={imageDimensions.height} x={lMargin} y={tMargin} />;
  //   shadowColor='black' shadowBlur={0} shadowOffset={{x: 10, y: 10}} shadowOpacity={0.5}
  };

  const MatTexture = () => {
    const [matImage] = useImage("https://media.istockphoto.com/id/468422477/photo/seamless-felt-textured-paper-background.jpg?s=170667a&w=0&k=20&c=u3pcni7rG8Awe7DveGsH8O9hDf5jAAeg_MBHLbXUjDM=");
    return <Rect fillPatternImage={matImage} fillPatternScale={{ x: 0.6, y: 0.6 }} width={1000} height={1000}
                 globalCompositeOperation="multiply" opacity={0.8} />;
  };

  return (
    <Stage width={imageDimensions.width + lMargin + rMargin} height={imageDimensions.height + tMargin + bMargin}>
      <Layer>
        <Rect width={imageDimensions.width  + lMargin + rMargin} height={imageDimensions.height + tMargin + bMargin} fill={matColor} />
        <MatTexture />
        <Painting />
        <Line points={[lMargin, 900, lMargin, tMargin, 843 + lMargin, tMargin]} stroke="black" strokeWidth={2} opacity={0.25} filters={[Konva.Filters.Blur]} blurRadius={30} />
        <Line points={[843 + lMargin, tMargin, 843 + lMargin, 900]} stroke="white" strokeWidth={2} opacity={0.4} filters={[Konva.Filters.Blur]} blurRadius={30} />
      </Layer>
    </Stage>
  );
};

export default Canvas;