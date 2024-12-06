import { CheckboxInList } from "../ui/Checkbox";
import { toTitleCase, convertToLabel } from "../../api/utils/utils";

export default function SpendCats({ id, spendCats, selectedCats, onChangeCat, onClickFn }) {

    // console.table(selectedCats);
    // console.table(spendCats);

    // function toggleCatOn(cat) {

    //     let newSelectedCats = JSON.parse(JSON.stringify(selectedCats));

    //     if (selectedCats.includes(cat)) {
    //         newSelectedCats = newSelectedCats.filter(item => item !== cat);
    //     } else {
    //         newSelectedCats.push(cat);
    //     }

    //     setSelectedCats(newSelectedCats);
    // }

    return (
        <div className="max-h-[70vh] overflow-scroll">
            {spendCats.map(cat =>
                <CheckboxInList key={convertToLabel(cat)}
                    label={toTitleCase(cat)}
                    value={selectedCats.includes(toTitleCase(cat))}
                    onChange={() => onChangeCat(toTitleCase(cat))}
                />)
            }
        </div>
    );

}