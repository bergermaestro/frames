import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, ColorInput, NumberInput, Select, Slider, Title } from "@mantine/core";
import Canvas from "../components/Canvas";
import { Circle, Layer, Rect, Stage } from "react-konva";

const Painting: NextPage = () => {
  const { query, isReady } = useRouter();

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [matWidth, setMatWidth] = useState(40);
  const [matColor, setMatColor] = useState("#e8e8e8");


  const [tMargin, setTMargin] = useState(0);
  const [rMargin, setRMargin] = useState(0);
  const [bMargin, setBMargin] = useState(0);
  const [lMargin, setLMargin] = useState(0);

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
      });

  }, [isReady]);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  console.log("data", data);

  const aspectRatios = [
    { label: "1:1", value: "1:1" },
    { label: "4:3", value: "4:3" },
    { label: "16:9", value: "16:9" },
    { label: "16:10", value: "16:10" },
    { label: "21:9", value: "21:9" }
  ];

  const frameStyles = [
    { label: "Modern", value: "modern" },
    { label: "Ornate", value: "ornate" },
    { label: "Wooden", value: "wooden" }
  ];



  return (
    <div className="grid grid-cols-3 bg-teal-900 h-screen">
      <div className="m-16 p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col justify-between h-full">
          <div>
        <Link href="/" className="mb-16 uppercase"> Back</Link>
        <div className="my-4 space-y-4">
          <h1 className="text-4xl font-bold">{data.title}</h1>
          <h2 className="text-xl">{data.artist_title}</h2>
        </div>


        <div className="space-y-4 mt-16">
          <div className="flex justify-between space-x-2">
            <NumberInput label="Top" value={tMargin} onChange={(tMargin) => setTMargin(tMargin||0)}/>
            <NumberInput label="Right" value={rMargin} onChange={(rMargin) => setRMargin(rMargin||0)}/>
            <NumberInput label="Bottom" value={bMargin} onChange={(bMargin) => setBMargin(bMargin||0)}/>
            <NumberInput label="Left" value={lMargin} onChange={(lMargin) => setLMargin(lMargin||0)}/>
          </div>
          {/*<Title>Mat Width</Title>*/}
          {/*<Select*/}
          {/*  data={aspectRatios}*/}
          {/*  label="Aspect Ratio"*/}
          {/*/>*/}
          {/*<Slider value={matWidth} onChange={setMatWidth} />*/}
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
        <Canvas matWidth={matWidth} matColor={matColor} imageUrl={`https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg`} tMargin={tMargin}
        rMargin={rMargin} bMargin={bMargin} lMargin={lMargin}/>
        {/*<img src={`https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg`} alt={data.title}*/}
        {/*     className="object-cover col-span-2 p-16" />*/}
      </div>
    </div>
  );
};
export default Painting;
