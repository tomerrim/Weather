import { ChangeEvent, useState } from "react";
import "./SearchBar.css";

interface SearchBarProps{
    onSubmit: (value: string) => Promise<void>;
};

const SearchBar: React.FC<SearchBarProps> = ({onSubmit}) => {
    
    const [value, setValue] = useState("");

    function submit(e: React.KeyboardEvent<HTMLInputElement>) {
        if(e.key === "Enter" && value.trim() !== ""){
            onSubmit(value);
            setValue("");
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>){
        setValue(e.target.value);
    }

    return(
        <>
            <input type="text" className="input"
             placeholder="Search City" onKeyUp={submit}
             value={value} onChange={handleChange}/>
        </>
    )
}

export default SearchBar;