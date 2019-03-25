import React from 'react';
import ActionButton from '../Buttons/ActionButton';

const CreateMenuItemComponent = (props) => {
  const { 
    handleChange,
    handleCloseFormItem,
    menuItemToShow,
    toggleCreateMenuItem,
    handleFunction,
    errors,
    infoText,
  } = props;

  const componentNameFormatted = menuItemToShow.charAt(0).toUpperCase() + menuItemToShow.slice(1);
  
  const formItems = Object.entries(props.inputDataToShow).map((arr, i) => {
    const inputName = arr[0];
    const inputVal = arr[1];
    const placeholder = inputName.charAt(0).toUpperCase() + inputName.split(/(?=[A-Z])/).join(' ').slice(1);
    const id = `${menuItemToShow}_${inputName}`;
    return (
      <div key={i} className='create_menu_item_component_inputs_item'>
        <input id={id} value={inputVal} placeholder={placeholder} onChange={handleChange} type="text" />
        <div className='errorClass'>{errors[menuItemToShow][inputName]}</div>
      </div>
    )
  })

  return (
    <div onClick={handleCloseFormItem} className="popup_form">
      <div className='popup_form_inner'>
        <button onClick={toggleCreateMenuItem} className='close_popup_button'>X</button>
        <div className='create_menu_item_component_container'>
          {/**** TITLE  ****/}
          <div className='create_menu_item_component_title'>
            <h2>Create a {componentNameFormatted}</h2>
          </div>
          <div className='create_menu_item_component_help_info'>
            <p>{infoText}</p>
          </div>
          {/**** FORM ****/}
          <div className='create_menu_item_component_inputs'>
            {formItems}
          </div>
          {/**** BUTTONS ****/}
          <div className='create_menu_item_component_buttons'>
            <ActionButton clickHandler={handleFunction} buttonText={`Create`}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateMenuItemComponent;