import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ColorInput, Input, Select, Slider, Title } from "@mantine/core";

const Painting: NextPage = () => {
  const { query , isReady } = useRouter()

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    if (!isReady) {
      return;
    }
    const { painting }  = query

    setLoading(true)

    fetch(`https://api.artic.edu/api/v1/artworks/${painting}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data.data)
        setLoading(false)
      })

  }, [isReady])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

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
    { label: "Wooden", value: "wooden" },
  ]

  return (
    <div className="grid grid-cols-3 bg-teal-900 max-h-screen">
      <div className="m-16 p-6 bg-white rounded-lg shadow-lg">
        <Link href="/" className="mb-16 uppercase"> Back</Link>
        <div className="my-4 space-y-4">
          <h1 className="text-4xl font-bold">{data.title}</h1>
          <h2 className="text-xl">{data.artist_title}</h2>
        </div>

        <div className="my-4 space-y-4">

        <div className="flex justify-between">
        <Input/><Input/>
        </div>
        {/*<Title>Mat Width</Title>*/}
        <Slider/>
        <Select
          data={aspectRatios}
          label="Aspect Ratio"
        />
        <ColorInput
          name="color"
          label="Mat Color"
          disallowInput
          withPicker={false}
          swatchesPerRow={7}
          radius="md"
          swatches={['#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
        />
        <Select
          data={frameStyles}
          label="Frame Style"
        />
        </div>
      </div>
      <img src={`https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg`} alt={data.title}
           className="object-cover col-span-2 p-16" />
    </div>
  )
}
export default Painting;


// useEffect(() => {
//   async function fetchData() {
//     // You can await here
//     const response = await MyAPI.getData(someId);
//     // ...
//   }
//   fetchData();
// }, [someId]); // Or [] if effect doesn't need props or state