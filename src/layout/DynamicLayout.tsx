import style from "./style.module.css"

interface Props {
    children: React.ReactNode
}

export default function DynamicLayout({children}:Props) {
   return (
    <div className={style["profile-dynamic-margin"]}>
      <div className='w-full md:w-[75%] m-auto h-auto'>
        <div
          className={[
            style["profile-dynamic"], "py-10 border border-gray-300 w-full py-2 rounded-lg hover:bg-gray-50 transition shadow-lg rounded-xl"
          ].join(" ")}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
