import { faPlus, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '../components/DashButton';
import { BasicTable } from '../components/Table';
import { Search } from '../components/Search';
import {ModalUsers} from '../components/ModalUsers';



export function Dashboard(){

  const handleAddClick = () => {
    throw new Error('Function not implemented.');
  }

    return(
      <>
        <div className=''>

           <div className="container px-6 mx-auto grid">
             <h2 className="my-6 text-3xl font-semibold text-black ">
               Dashboard - Usuarios

             </h2>

             <Search className='hidden sm:flex'/>
              <div className='flex space-x-3 my-5'>
              <ModalUsers />

              <IconButton id={'respaldoBtn'} text={'Respaldo'} icon={faCloudArrowUp} onClick={handleAddClick}/>

              </div>
              <div className=''>
                <BasicTable />
            </div>
           </div>
        </div>
        </>
     );
   }
