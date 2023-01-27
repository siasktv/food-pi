import React, {useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';
import { Container, FormWrap, Icon, FormContent, Form, FormH1, FormLabel, FormInput, FormButton } from "./SigninElements";
import Footer from "../footer/Footer";
import { postRecipe, getDiets } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import "./Dropdown.css";
import { ToastContainer, toast } from 'react-toastify'

const CloseIcon = () => {
    return (
        <svg height="20" width="20" viewBox="0 0 20 20">
            <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
        </svg>
    );
};
const Icon1 = () => {
    return (
      <svg height="20" width="20" viewBox="0 0 20 20">
        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
      </svg>
    );
  };

  function validate(input) {
    let errors = {};
  
    if (!input.name.trim()) {
      errors.name = 'Name required';
    }
  
    if (!input.summary) {
      errors.summary = 'Summary required';
    }
    if (!input.steps) {
        errors.steps = 'Steps required';
    }
    if (!input.image) {
        errors.image = 'Image required';
      }
    if (!input.healthScore) {
      errors.healthScore = 'Score is required';
    } else if ( input.healthScore < 0 || input.healthScore > 100 ) {
      errors.healthScore = 'HealthScore needs to be between 0 & 100';
    }
    return errors;
  }

const SignIn = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const allDiets = useSelector((state) => state.diets);
    const [errors, setErrors] = useState({});
    const placeHolder = "Select type of diet"; 
    const isMulti = [];
    const[showMenu, setShowMenu] = useState(false);
    const[selectedValue, setSelectedValue] = useState(isMulti ? [] : null);
    const [input, setInput] = useState({
        name: '',
        summary: '',
        healthScore: '',
        steps:'',
        image:'',
        diets: selectedValue
    });
    
    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch]);

    const handleChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    function handleSelect (e) {
        if(e.target.name === 'diets') {
         setInput({
             ...input,
             diets: [...input.diets, e.target.value]
         });
     }
 }

   

    useEffect(() => {
        const handler = () => setShowMenu(false);

        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler)
        }
    });

    const handleInputClick = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu)
    }
    
    const getDisplay = () => {
    if(!selectedValue || selectedValue.length === 0){
        return placeHolder;
    }
    if(isMulti) {
        return(
            <div 
            name='diets' 
            onChange={(e) =>  handleSelect(e)} className="dropdown-tags">
                    {selectedValue.map((option) => (
                        <div onChange={e => handleChange(e)} key={option} value={option} className="dropdown-tag-item">
                            {option}
                            <span onClick={(e) => onTagRemove(e, option)} className="dropdown-tag-close"><CloseIcon /></span>
                        </div>
                    ))}
                </div>
        );
    }
    return selectedValue;
    };

    const removeOption = (option) => {
        return selectedValue.filter((o) => o !== option);
    };
    const onTagRemove = (e, option) => {
        e.stopPropagation();
        setSelectedValue(removeOption(option));
    };

    const onItemClick = (option) => {
        let newValue;
        if (isMulti) {
            if (selectedValue.findIndex((o) => o === option) >= 0) {
                newValue = removeOption(option);
            } else {
                newValue = [...selectedValue, option];
            }
        } else {
            newValue = option;
        }
        setSelectedValue(newValue);
    };

    const isSelected = (option) => {
        if (isMulti) {
            return selectedValue.filter((o) => o === option).length > 0;
        }
        if(!selectedValue) {
            return false;
        }

        return selectedValue === option
    }

    function handleSubmit (e) {
        e.preventDefault();
        setErrors(validate(input));
            dispatch(postRecipe(input))
            history.push('/')
        }
        // setInput({
        //     name: '',
        //     summary: '',
        //     healthScore: '',
        //     steps:'',
        //     image:'',
        //     diet: []
        // })
        // history.push('/home')

        function handleDelete (el){
            setInput({
                ...input,
                diets: input.diets.filter(d => d !== el)
            })
        }
    
    return(
        <>
           <Container>
            <FormWrap>
                <Icon to="/">HenryFood</Icon>
                <FormContent>
                    <Form onSubmit={e => handleSubmit(e)}>
                        <FormH1>Create a recipe!</FormH1>
                        <FormLabel htmlFor="for">Name</FormLabel>
                        <FormInput
                        value={input.name}
                        name="name"
                        onChange={(e) => handleChange(e)}
                        type="text" required/>
                        {errors.name && <p>{errors.name}</p>}
                        <FormLabel htmlFor="for">Summary</FormLabel>
                        <FormInput 
                        value={input.summary}
                        name="summary"
                        onChange={(e) => handleChange(e)}
                        type="text" required/>
                        {errors.summary && <p>{errors.summary}</p>}
                        <FormLabel htmlFor="for">Steps</FormLabel>
                        <FormInput 
                        value={input.steps}
                        name="steps"
                        onChange={(e) => handleChange(e)}
                        type="text" required/>
                        {errors.steps && <p>{errors.steps}</p>}
                        <FormLabel htmlFor="for">Image Link</FormLabel>
                        <FormInput 
                        value={input.image}
                        name="image"
                        onChange={(e) => handleChange(e)}
                        type="url" required/>
                        {errors.image && <p>{errors.image}</p>}
                        <FormLabel htmlFor="for">Health Score</FormLabel>
                        <FormInput
                        value={input.healthScore} 
                        name="healthScore"
                        onChange={(e) => handleChange(e)}
                        type="number" 
                        required/>
                        {errors.healthScore && <p>{errors.healthScore}</p>}

                        {/* <Dropdown isMulti placeHolder="Select type of diet..." options={allDiets}/> */}
                        
                        <div className="dropdown-container"
                        placeholder="Select type of diet"
                        >
                        <div onClick={handleInputClick} className="dropdown-input">
                        <div className="dropdown-selected-value">{getDisplay()}</div>
                        <div className="dropdown-tools">
                        <div className="dropdown-tool">
                        {/* <Icon1 /> */}
                      </div>
                     </div>
                   </div>
                    {/* {showMenu && (
                        <div className='dropdown-menu'
                        value={input.diets}
                        name='diets'
                        onChange={(e) =>  handleSelect(e)}
                        >
                        { allDiets.map((option) => (
                        <div
                        onChange={(e) => handleChange(e)}
                        key={option} value={option}
                        onClick={() => onItemClick(option)}
                        className={`dropdown-item ${isSelected(option) && "selected"}`}
                        >
                        {option}</div> 
                        ))}
                        </div>
                        )} */}
                        <div className="custom_select">
                        <select 
                        className='dropdown-menu'
                        name='diets' 
                        onChange={(e) =>  handleSelect(e)}
                        >
                       {

                        allDiets.map(d => 
                        <option onChange={e => handleChange(e)} key={d} value={d}>{d}</option>
                         )
                       }
                       </select>
                      </div>
                   </div>

     {
            input.diets.map(el => 
                <div>
                    <p>{el}</p>
                    <button className="delete-button" onClick={() => handleDelete(el)}>x</button>
                </div>
                )
        }
                    <FormButton type="submit">Create</FormButton>
                  </Form>
                </FormContent>
            </FormWrap>
            <Footer/>
           </Container>
        </>
    )
}

export default SignIn;