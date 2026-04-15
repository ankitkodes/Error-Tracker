"use client"
import { easeOut, motion } from "framer-motion";

export default function Page(){
   return (
    <>
     <motion.div
    initial={{opacity:0, y:50}}
    animate={{opacity:1, y:0}}
    transition={{duration:1, ease:easeOut}} className="border-2 p-4 bg-red-400 m-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque obcaecati, nulla tempore odio vero reiciendis, eligendi blanditiis dolor debitis numquam sunt. Totam ipsum tempore, magnam dolore qui porro excepturi optio eum reiciendis sit dicta culpa beatae cumque, earum libero maxime amet unde voluptatum. Eaque repellat voluptate, iusto nisi maxime quod animi mollitia nostrum cum optio quas minus illum tenetur excepturi. Illo aliquid ducimus ratione, omnis error earum dicta voluptate id praesentium, labore dignissimos vel enim fugit obcaecati dolores neque excepturi, vitae aut a? Inventore animi repudiandae quod. Est, amet voluptatum ex sit, fugit corporis natus eos reprehenderit modi voluptatibus tempore!</motion.div>
    <motion.div
    initial={{opacity:0, y:50}}
    animate={{opacity:1, y:0}}
    transition={{duration:1, ease:easeOut}} className="border-2 p-4 bg-yellow-400 m-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque obcaecati, nulla tempore odio vero reiciendis, eligendi blanditiis dolor debitis numquam sunt. Totam ipsum tempore, magnam dolore qui porro excepturi optio eum reiciendis sit dicta culpa beatae cumque, earum libero maxime amet unde voluptatum. Eaque repellat voluptate, iusto nisi maxime quod animi mollitia nostrum cum optio quas minus illum tenetur excepturi. Illo aliquid ducimus ratione, omnis error earum dicta voluptate id praesentium, labore dignissimos vel enim fugit obcaecati dolores neque excepturi, vitae aut a? Inventore animi repudiandae quod. Est, amet voluptatum ex sit, fugit corporis natus eos reprehenderit modi voluptatibus tempore!</motion.div>
     <motion.div
    initial={{opacity:0, y:50}}
    animate={{opacity:1, y:0}}
    transition={{duration:1, ease:easeOut}} className="border-2 p-4 bg-gray-400 m-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque obcaecati, nulla tempore odio vero reiciendis, eligendi blanditiis dolor debitis numquam sunt. Totam ipsum tempore, magnam dolore qui porro excepturi optio eum reiciendis sit dicta culpa beatae cumque, earum libero maxime amet unde voluptatum. Eaque repellat voluptate, iusto nisi maxime quod animi mollitia nostrum cum optio quas minus illum tenetur excepturi. Illo aliquid ducimus ratione, omnis error earum dicta voluptate id praesentium, labore dignissimos vel enim fugit obcaecati dolores neque excepturi, vitae aut a? Inventore animi repudiandae quod. Est, amet voluptatum ex sit, fugit corporis natus eos reprehenderit modi voluptatibus tempore!</motion.div>
     <motion.div
    initial={{opacity:0, y:50}}
    animate={{opacity:1, y:0}}
    transition={{duration:1, ease:easeOut}} className="border-2 p-4 bg-green-400 m-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque obcaecati, nulla tempore odio vero reiciendis, eligendi blanditiis dolor debitis numquam sunt. Totam ipsum tempore, magnam dolore qui porro excepturi optio eum reiciendis sit dicta culpa beatae cumque, earum libero maxime amet unde voluptatum. Eaque repellat voluptate, iusto nisi maxime quod animi mollitia nostrum cum optio quas minus illum tenetur excepturi. Illo aliquid ducimus ratione, omnis error earum dicta voluptate id praesentium, labore dignissimos vel enim fugit obcaecati dolores neque excepturi, vitae aut a? Inventore animi repudiandae quod. Est, amet voluptatum ex sit, fugit corporis natus eos reprehenderit modi voluptatibus tempore!</motion.div>
     <motion.div
    initial={{opacity:0, y:50}}
    animate={{opacity:1, y:0}}
    transition={{duration:1, ease:easeOut}} className="border-2 p-4 bg-red-400 m-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque obcaecati, nulla tempore odio vero reiciendis, eligendi blanditiis dolor debitis numquam sunt. Totam ipsum tempore, magnam dolore qui porro excepturi optio eum reiciendis sit dicta culpa beatae cumque, earum libero maxime amet unde voluptatum. Eaque repellat voluptate, iusto nisi maxime quod animi mollitia nostrum cum optio quas minus illum tenetur excepturi. Illo aliquid ducimus ratione, omnis error earum dicta voluptate id praesentium, labore dignissimos vel enim fugit obcaecati dolores neque excepturi, vitae aut a? Inventore animi repudiandae quod. Est, amet voluptatum ex sit, fugit corporis natus eos reprehenderit modi voluptatibus tempore!</motion.div>
     <motion.div
    initial={{opacity:0, y:50}}
    animate={{opacity:1, y:0}}
    transition={{duration:1, ease:easeOut}} className="border-2 p-4 bg--400 m-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque obcaecati, nulla tempore odio vero reiciendis, eligendi blanditiis dolor debitis numquam sunt. Totam ipsum tempore, magnam dolore qui porro excepturi optio eum reiciendis sit dicta culpa beatae cumque, earum libero maxime amet unde voluptatum. Eaque repellat voluptate, iusto nisi maxime quod animi mollitia nostrum cum optio quas minus illum tenetur excepturi. Illo aliquid ducimus ratione, omnis error earum dicta voluptate id praesentium, labore dignissimos vel enim fugit obcaecati dolores neque excepturi, vitae aut a? Inventore animi repudiandae quod. Est, amet voluptatum ex sit, fugit corporis natus eos reprehenderit modi voluptatibus tempore!</motion.div>
   <motion.button whileHover={{ scale: 1.1 }}>
  Hover me
</motion.button>
     </>
  );
}