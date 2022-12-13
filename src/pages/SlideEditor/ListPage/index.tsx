import {AddCircle} from '@mui/icons-material';
import Card from './Card';
import styles from './styles.module.css';

interface Props {
  listPage: any[];
  onSelect: (index: number) => void;
  onDelete: (index: number) => void;
  addNewPage: () => void;
  selectedIndex: number;
}

const ListPage = ({listPage, addNewPage, onSelect, onDelete, selectedIndex = 0}: Props) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>List pages</p>

      <div className={styles.listCardCtn}>
        <div className={styles.listCard}>
          {/* List pages */}
          {listPage.map((item, index) => {
            return (
              <Card
                data={item}
                isSelected={selectedIndex === index}
                key={index}
                onSelect={() => {
                  onSelect(index);
                }}
                onDelete={() => {
                  onDelete(index);
                }}
              />
            );
          })}
        </div>
      </div>
      <button className={styles.button} onClick={addNewPage}>
        <AddCircle />
        <p>Add new slide</p>
        <div></div>
      </button>
    </div>
  );
};

export default ListPage;
