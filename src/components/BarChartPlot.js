import { BarChart, XAxis, YAxis, Bar, Tooltip, Legend, ResponsiveContainer} from "recharts";


const BarChartPlot = () => {
    
    // const {data : socketData} = useSocket(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL);

    const generateRandomData = () => {
        try {
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
          return months.map((month) => ({
            name: month,
            high: Math.floor(Math.random() * 10000),
            low: Math.floor(Math.random() * 6000),
          }));
        } catch (error) {
          console.error('Error generating data:', error);
          return []; // Return empty array or default data
        }
      };

      const data = generateRandomData();


    // const [data, setData] = useState([
    //   {
    //       name: "Jan",
    //       high: 4000,
    //       low: 2400
    //   },
    //   {
    //       name: "Feb",
    //       high: 5000,
    //       low: 1500
    //   },
    //   {
    //       name: "Mar",
    //       high: 6000,
    //       low: 3000
    //   },
    //   {
    //       name: "Apr",
    //       high: 6500,
    //       low: 4500
    //   },
    //   {
    //       name: "May",
    //       high: 7000,
    //       low: 2200
    //   },
    //   {
    //       name: "Jun",
    //       high: 8000,
    //       low: 3500
    //   },
    //   {
    //       name: "Jul",
    //       high: 7400,
    //       low: 5500
    //   },
    // ]);

    // useEffect(() => {
    //     if (socketData && socketData.length > 0) {
    //       setData(socketData);
    //     }
    //   }, [socketData]);

    return (
        <>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart width={730} height={250} data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="high" fill="#82ca9d" />
              <Bar dataKey="low" fill="#FA8072" />
            </BarChart>
          </ResponsiveContainer>
        </>
      );
  } 
  
  
export default BarChartPlot;