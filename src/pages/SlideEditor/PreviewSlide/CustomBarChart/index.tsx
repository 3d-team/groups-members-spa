import {OptionModel} from '@/models/page';
import {ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, LabelList, Label} from 'recharts';

interface Props {
  data?: OptionModel[];
}

const renderCustomizedLabel = (props: any) => {
  const {x, y, width, height, value} = props;
  const radius = 16;
  console.log('@DUKE__', value);

  return (
    <g>
      <text x={x + width / 2} y={y - radius} fill="#fff" textAnchor="middle" dominantBaseline="middle" font-size="1.5em">
        {value}
      </text>
    </g>
  );
};

export default function CustomBarChart({
  data = [
    {
      name: 'Ngay 12/1',
      value: 30,
    },
    {
      name: 'Ngay 21/12',
      value: 24,
    },
  ],
}: Props) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={400}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        {/* <YAxis /> */}
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#e8710a" name="Rating">
          <LabelList dataKey="value" content={renderCustomizedLabel} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
