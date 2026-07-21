import { useEffect, useState } from "react";
import { CloseCircleOutline } from "react-ionicons";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { closeTagList, setIsLoading as setTagIsLoading } from "../store/slices/tagSlice";
import { openCreateTag as openCreateTagAction } from "../store/slices/createTagSlice";
import CreateTag from "./CreateTag";

import { db } from "../firebase/FirebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import Spinner from "./Spinner";
import type { Tag } from "../types/tag";

interface TagListProps {
  onSelect: (tag: Tag) => void;
}

const TagList = ({ onSelect }: TagListProps) => {
  const [tags, setTags] = useState<Tag[]>([
    // {
    //   emoji: "🏠",
    //   value: "rent",
    // },
    // {
    //   emoji: "👕",
    //   value: "clothes",
    // },
    // {
    //   emoji: "💪🏼",
    //   value: "gym",
    // },
    // {
    //   emoji: "🚗",
    //   value: "car",
    // },
    // {
    //   emoji: "✈️",
    //   value: "travel",
    // },
    // {
    //   emoji: "💳",
    //   value: "subscription",
    // },
  ]);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.tag.isLoading);
  const setIsLoading = (value: boolean) => dispatch(setTagIsLoading(value));
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      onSnapshot(collection(db, "tags"), (snapshot) => {
        setTags(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Tag)
        );
        setIsLoading(false);
      });
    }, 3000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount only
  }, []);

  const handleCloseTagList = () => dispatch(closeTagList());
  const openCreateTag = useAppSelector((state) => state.createTag.openCreateTag);
  const handleOpenCreateTag = () => dispatch(openCreateTagAction());
  const handleSelect = (item: Tag) => {
    onSelect(item);
    handleCloseTagList();
  };

  if (openCreateTag)
    return (
      <>
        <CreateTag />
      </>
    );
  return (
    <section className="h-full mx-auto flex justify-center">
      <article className=" fixed bottom-0 h-full mx-auto w-full sm:w-1/3 md:w-2/3 lg:w-1/2  dark:bg-black dark:bg-opacity-60 bg-opacity-60 backdrop-blur-lg bg-white transition ease-linear drop-shadow-2xl">
        <div className=" mx-auto fixed bottom-5  py-5 border-t w-full border-t-zinc-200 rounded-2xl px-5 text-slate-400 dark:bg-black bg-white">
          <div className="flex justify-between items-center">
            <h4 className="uppercase">expenses</h4>
            <span className="cursor-pointer hover:scale-110 ease-in transition-all">
              <CloseCircleOutline
                color="#4A5568"
                height="30px"
                width="30px"
                onClick={handleCloseTagList}
              />
            </span>
          </div>
          <ul className="grid grid-cols-3 gap-x-5 sm:grid-cols-5 sm:grid-rows-3">
            <li
              onClick={handleOpenCreateTag}
              className=" h-max w-max py-2 px-4 rounded-3xl font-bold text-xl border  cursor-pointer hover:scale-110 transition-all ease-in hover:bg-slate-100"
            >
              +
            </li>
            {isLoading && (
              <div className="flex justify-center items-center">
                <Spinner />
              </div>
            )}
            {!isLoading && (
              <>
                {tags.map((tag) => (
                  <li
                    key={tag.id}
                    onClick={() => handleSelect(tag)}
                    className=" hover:scale-110 transition-all ease-in flex justify-center items-center flex-col cursor-pointer "
                  >
                    <span>{tag.emoji}</span>
                    <p>{tag.value}</p>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
      </article>
    </section>
  );
};

export default TagList;
