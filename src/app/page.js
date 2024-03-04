"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [ListData, SetListData] = useState([]);
  const [ListDataKategori, SetListDataKategori] = useState([]);
  const [SelectRole, SetSelectRole] = useState("all");

  const [SelectItem, SetSelectItem] = useState({
    abilities: [],
  });
  const [ShowModal, SetShowModal] = useState(false);

  useEffect(() => {
    fecthData();
  }, [SelectRole]);

  const fecthData = async () => {
    await axios
      .get("https://staging.ina17.com/data.json")
      .then((ress) => {
        let tempData = ress.data;

        if (SelectRole !== "all") {
          let tempDataAfterFilter = tempData.filter((value) => {
            console.log("SelectRole", SelectRole);
            return value.role === SelectRole;
          });

          SetListData(tempDataAfterFilter);
        } else {
          SetListData(tempData);
        }

        let kategori = tempData.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.role === value.role)
        );

        SetListDataKategori(kategori);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleSelectItem = (item) => {
    SetSelectItem(item);
    SetShowModal(true);
  };

  const hideModal = () => {
    SetShowModal(false);
  };

  const handleFilter = async (item) => {
    SetSelectRole(item);
  };

  return (
    <>
      {/* banner */}
      <div className="md:h-[400px] h-80 w-full relative -mt-20">
        <Image
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
          priority
          alt="banner image"
          src={`https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
        />
      </div>
      {/* banner end */}

      {/* Kategori */}
      <div className="flex justify-center bg-transparent relative z-20 -mt-10 ">
        <div className=" bg-white uppercase   relative  py-4 px-6  md:w-[60%] flex rounded-lg border shadow mb-3">
          <div className="flex items-center">
            <div className="h-10 w-10 relative rounded-full">
              <Image
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                alt="banner image"
                className="rounded-full"
                src={`https://media.valorant-api.com/agents/1e58de9c-4950-5125-93e9-a0aee9f98746/displayicon.png`}
              />
            </div>
            <div className="ml-3">GO GAME</div>
          </div>
          <div className="flex flex-nowrap   pb-2  ml-auto">
            <div className="ml-9">
              <div
                className={`flex-nowrap text-nowrap text-center font-medium mt-2 cursor-pointer ${
                  SelectRole === "all" ? "text-blue-700" : ""
                }`}
                onClick={() => handleFilter("all")}
              >
                ALL Category
              </div>
            </div>
            {ListDataKategori.map((item, index) => {
              return (
                <div
                  className="ml-9"
                  key={index}
                  onClick={() => handleFilter(item.role)}
                >
                  <div
                    className={`flex-nowrap text-nowrap text-center font-medium mt-2 cursor-pointer ${
                      SelectRole === item.role ? "text-blue-700" : ""
                    }`}
                  >
                    {item.role}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Kategori end */}

      {/* Card */}
      <div className="md:px-32 px-4 mb-32">
        <div className="grid md:grid-cols-12 grid-cols-1 grid-flow-row gap-2 md:gap-4 mt-4">
          {ListData.map((item, index) => {
            return (
              <div
                className="col-span-2 relative cursor-pointer"
                key={index}
                onClick={() => handleSelectItem(item)}
              >
                <div className="md:w-full md:h-72 w-full h-10 overflow-clip text-center relative bg-gradient-to-tr  from-sky-700 to-blue-300 rounded-xl  flex flex-col justify-center items-center">
                  <Image
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    alt="banner image"
                    className="rounded-full w-full h-auto object-contain pb-10"
                    src={item.fullPortrait}
                  />
                </div>
                <div className="text-center z-10 relative font-semibold text-xl  -mt-10 mb-3 text-white uppercase">
                  {item.displayName}
                </div>
                <div className=" flex-nowrap text-nowrap text-center font-medium top-0 text-sky-700 bg-yellow-400  inline-block px-3 py-1 rounded-lg rounded-tl-none rounded-br-none text-xs absolute z-10 right-0">
                  {item.role}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Card end */}

      {/* Modal Detail */}
      {ShowModal && (
        <div
          className="fixed h-screen w-screen flex flex-col justify-center items-center bg-gray-900 bg-opacity-30 top-0 z-50"
          onClick={hideModal}
        >
          <div className="bg-white md:w-1/2 rounded-xl p-4">
            <div className="grid md:grid-cols-12 grid-cols-1 grid-flow-row gap-2 md:gap-4">
              <div className="col-span-4">
                <div className="md:w-full md:h-full w-full h-32 overflow-clip text-center relative bg-gradient-to-tr  from-sky-700 to-blue-300 rounded-xl  flex flex-col justify-center items-center">
                  <Image
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    alt="banner image"
                    className="rounded-full w-full h-full object-contain "
                    src={SelectItem.fullPortrait}
                  />
                </div>
              </div>
              <div className="col-span-8">
                <div className="text-3xl uppercase font-bold ">
                  {SelectItem.displayName}
                </div>

                <div className=" mt-3 text-gray-600 text-sm">
                  {SelectItem.description}
                </div>
                <div className="md:w-full md:h-16 w-full mt-2 mb-24 ">
                  <iframe
                    className="w-full h-30"
                    src={SelectItem.video}
                    frameborder="0"
                    allowfullscreen
                  />
                </div>
                <div className="mt-10 border p-3 rounded-lg">
                  <div className="text-lg uppercase font-semibold mb-3">
                    abilities
                  </div>
                  <div className="flex justify-around flex-wrap">
                    {SelectItem.abilities.map((item, index) => {
                      return (
                        <div className="mx-2 w-20" key={index}>
                          <div className="md:w-full md:h-16 w-full h-10  overflow-clip text-center relative bg-gradient-to-tr  from-pink-700 to-yellow-400 rounded-xl  flex flex-col justify-center items-center">
                            <Image
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              priority
                              alt="banner image"
                              className=" w-full h-auto object-contain p-3 "
                              src={item.displayIcon}
                            />
                          </div>
                          <div className="mt-2 font-medium text-center text-xs">
                            {item.displayName}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal Detail end */}
    </>
  );
}
