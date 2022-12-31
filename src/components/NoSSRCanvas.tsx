//this weird file exists because of an error that happens when using konva in nextjs
//see https://github.com/konvajs/react-konva/issues/588 for more info

import dynamic from "next/dynamic";

const NoSSRComponent = dynamic(() => import("./Canvas"), {
  ssr: false,
});

const Canvas = ({ matColor, imageUrl, margins, imageDimensions }: { matColor: string, imageUrl: string, margins: {tMargin: number, rMargin: number, bMargin: number, lMargin: number}, imageDimensions: { height:number, width:number } }) => {
  return <NoSSRComponent matColor={matColor} imageUrl={imageUrl} margins={margins} imageDimensions={imageDimensions} />;
}

export default Canvas