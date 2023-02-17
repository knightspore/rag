import {IoArrowBackSharp, IoArrowForwardSharp} from "react-icons/io5"
import { FeedControl } from "../../pages";

export default function Pagination({ cursor, controls }: {cursor: string | null, controls: FeedControl}) {
	return <div className="flex justify-between p-4">
        <button onClick={() => controls.handlePrevPage()} className={controls.cursorHist.length === 0 ? "opacity-0" : ""} disabled={controls.cursorHist.length === 0}>
          <IoArrowBackSharp size={18} /> Prev 
        </button>
        <button disabled>
          {controls.cursorHist.length+1}
        </button>
        <button onClick={() => controls.handleNextPage(cursor)}>
          Next <IoArrowForwardSharp size={18} />
        </button>
        </div>
}