import { joinStyle } from "../../utils/styles";

type TBtnProps = {
    isArrow: boolean,
    isRotate: boolean,
    onClick: () => void,
    children: React.ReactNode | undefined | null
}

function Btn(props: TBtnProps) {

    const svgIcon = (
        <div className={joinStyle(props.isRotate ? "rotate-[-90deg]" : "rotate-90", "flex justify-center items-center")}>
            <svg width="12" height="14" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.818604 11L4.73075 7.08785C5.33155 6.48705 5.33155 5.51295 4.73075 4.91215L0.818604 1" stroke="#FFFBFC" strokeWidth={2} />
            </svg>
        </div>
    )

    return (
        <button
            className={joinStyle(props.children ? "h-[36px] px-7 py-6" : "w-[36px] h-[36px] p-2", "bg-water-0 rounded flex gap-4 justify-center items-center")}
            onClick={props.onClick}
        >
            {props.children}
            {props.isArrow ? svgIcon : null}
        </button>
    )
}

export default Btn;