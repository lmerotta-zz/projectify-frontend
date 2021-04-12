import { XIcon } from "@heroicons/react/outline";
import tw from "twin.macro";

export const ModalHeaderWrapper = tw.div`p-4 flex items-start justify-between border-b-2 border-gray-200`;
export const ModalHeaderTitle = tw.h5`text-lg font-thin text-dark flex-grow`;
export const ModalHeaderCloseButtonWrapper = tw.div`flex self-stretch flex-shrink-0 cursor-pointer relative top-1.5`;
export const ModalHeaderCloseButton = tw(XIcon)`w-4 h-4`;
