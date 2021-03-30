import tw from "twin.macro";
import { motion } from "framer-motion";

const LeftPane = motion(
  tw.div`w-full flex-1 bg-white flex flex-col px-8 py-10 lg:w-1/3 md:px-48 lg:px-16 md:justify-center`
);
export default LeftPane;
