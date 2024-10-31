import { joinStyle } from '../../utils/styles';
import LinkComponent from '../LinkComponent';

type TPropsCard = {
    src: string,
    alt: string,
    header: string,
    text: string,
    link: string
}

export default function Card(props: TPropsCard) {
    return (
        <div className={joinStyle("bg-[#FFFBFC] p-4 rounded-[20px] shadow-sm")}>
            <img
                src={props.src}
                alt={props.alt}
                className={joinStyle("bg-[#94A78D] ")}
            />
            <div className={joinStyle("my-5 text-center line-clamp-2 text-[#010400] font-light text-sm")}>
                <h1 className={joinStyle("w-full text-center text-2xl font-medium mb-4")}>{props.header}</h1>
            </div>
            <LinkComponent
                link={props.link}
                hasArrow={true}
                fullWidth={true}
            >
                <span>Изучить</span>
            </LinkComponent>
        </div>
    )
}
