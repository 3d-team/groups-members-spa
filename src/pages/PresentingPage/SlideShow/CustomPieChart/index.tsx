import {OptionModel} from '@/models/presentation';
import {useMemo} from 'react';
import {PieChart, Pie, Cell, ResponsiveContainer} from 'recharts';
import styles from './styles.module.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#6faa00', '#003daa', '#aa0b00', '#aa006b'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = (props: any) => {
  const {cx, cy, midAngle, innerRadius, outerRadius, percent, index, value} = props;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="#000" fontSize={24} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
      {/* {value} */}
    </text>
  );
};

interface Props {
  data: OptionModel[];
}

const CustomPieChart = ({data = []}: Props) => {
  const isZero: boolean = useMemo(() => {
    const index = data.findIndex(item => {
      return item.value > 0;
    });
    return index < 0;
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.chartCtn}>
        {isZero ? (
          <div className={styles.nullPieChart}></div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie data={data} cx="50%" cy="50%" labelLine={false} label={renderCustomizedLabel} outerRadius={180} fill="#8884d8" dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className={styles.listCateCtn}>
        {data.map((item, index) => {
          return (
            <div className={styles.optionItem}>
              <div className={styles.optionColor} style={{backgroundColor: COLORS[index]}}>
                {item.value}
              </div>
              <p className={styles.optionName}>{`${item.name}`}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomPieChart;
