import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ColorInput, NumberInput } from "@mantine/core";
import Canvas from "../components/NoSSRCanvas";

// https://coolboi567.medium.com/dynamically-get-image-dimensions-from-image-url-in-react-d7e216887b68
const loadImage = (setImageDimensions:({height, width}: {height:number, width:number}) => void, imageUrl:string) => {
  const img = new Image();
  img.src = imageUrl;

  img.onload = () => {
    setImageDimensions({
      height: img.height,
      width: img.width
    });
  };
  img.onerror = (err) => {
    console.log("img error");
    console.error(err);
  };
};

const Painting: NextPage = () => {
  const { query, isReady } = useRouter();

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [matColor, setMatColor] = useState("#e8e8e8");

  const [margins, setMargins] = useState({tMargin: 0, rMargin: 0, bMargin: 0, lMargin: 0});
  const [imageDimensions, setImageDimensions] = useState({width: 0, height: 0});

  useEffect(() => {
    if (!isReady) {
      return;
    }
    const { painting } = query;

    setLoading(true);

    fetch(`https://api.artic.edu/api/v1/artworks/${painting}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
        loadImage(setImageDimensions, `https://www.artic.edu/iiif/2/${data.data.image_id}/full/843,/0/default.jpg`);
      });

  }, [isReady]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div className="grid grid-cols-3 bg-teal-900 h-screen">
      <div className="m-16 p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col justify-between h-full">
          <div>
        <Link href="/" className="mb-16 uppercase"> Back</Link>
        <div className="my-4">
          <h1 className="text-4xl font-bold">{data.title}</h1>
          <h2 className="text-xl">{data.artist_title}</h2>
        </div>

        <div className="space-y-5 mt-16">
          <div className="flex justify-between space-x-2">
            <NumberInput label="Top" value={margins.tMargin} onChange={(tMargin) => setMargins({...margins, tMargin: tMargin||0})}/>
            <NumberInput label="Right" value={margins.rMargin} onChange={(rMargin) => setMargins({...margins, rMargin: rMargin||0})}/>
            <NumberInput label="Bottom" value={margins.bMargin} onChange={(bMargin) => setMargins({...margins, bMargin: bMargin||0})}/>
            <NumberInput label="Left" value={margins.lMargin} onChange={(lMargin) => setMargins({...margins, lMargin: lMargin||0})}/>
          </div>

          <ColorInput
            name="color"
            label="Mat Color"
            withPicker={true}
            swatchesPerRow={7}
            radius="md"
            value={matColor} onChange={setMatColor}
            swatches={["#25262b", "#868e96", "#fa5252", "#e64980", "#be4bdb", "#7950f2", "#4c6ef5", "#228be6", "#15aabf", "#12b886", "#40c057", "#82c91e", "#fab005", "#fd7e14"]}
          />
          {/*<Select*/}
          {/*  data={frameStyles}*/}
          {/*  label="Frame Style"*/}
          {/*/>*/}
        </div>
          </div>
          <div>
            {/*<Button radius="lg" color="teal">Download Image</Button>*/}
            <button className="rounded-md bg-teal-900 text-white px-5 py-3">Download Image</button>
          </div>
        </div>
      </div>

      <div className="col-span-2 m-16 shadow-2xl">
        <Canvas matColor={matColor} imageUrl={`https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg`} margins={margins} imageDimensions={imageDimensions}/>
      </div>
    </div>
  );
};
export default Painting;
