interface ButtonProps {
    id:string
    text:string;
    type?: 'submit';
    onClick:()=>void;


  }
  
  export function Button({id,text,type,onClick}:ButtonProps){
  
    return(
      <div className="flex justify-center p-4">
        <button
        id={id}
        type={type}
        onClick={onClick}
        className="sm:w-60 w-fit bg-[#E90074] p-4 rounded-xl text-white text-xl hover:bg-red-950 transition-colors ease-in-out duration-[400ms]">
        {text}
        </button>
      </div>
  
  
    );
  }