import { joinStyle } from "../../utils/styles";
import st from "./loading.module.css";

export default function LoadingStatus() {
    return (
        <span className={joinStyle(st.loader, "m-8 mx-auto text-center")}></span>
    )
}
