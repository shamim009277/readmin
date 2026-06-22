import React from 'react'
import TopOrderTable from '../components//Layout/TopOrderTable'
// Simple inline icon components to avoid dependency issues with `lucide-react`
const Users = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z"></path><path d="M4 20c0-2.5 3.5-4 8-4s8 1.5 8 4"></path></svg>
)
const DollarSign = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 1v22"></path><path d="M17 5H9.5a3.5 3.5 0 000 7H14a3.5 3.5 0 010 7H6"></path></svg>
)
const ShoppingCart = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 6h15l-1.5 9h-12z"></path><circle cx="9" cy="20" r="1"></circle><circle cx="18" cy="20" r="1"></circle></svg>
)
const AlertCircle = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>
)
import Chart from 'react-apexcharts'

const Dashboard = () => {

  // Graph Data
  const usersData = [800, 950, 1100, 1250, 1400, 1650]
  const usersCategories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

  const salesData = [12000, 15000, 18000, 22000, 26000, 30000]
  const salesCategories = usersCategories

  const orderSeries = [520, 180, 60, 140]
  const orderLabels = ['Completed', 'Pending', 'Cancelled', 'Processing']

  const usersOptions = {
    chart: { id: 'users', toolbar: { show: false } },
    xaxis: { categories: usersCategories },
    stroke: { curve: 'smooth' },
    colors: ['#3b82f6'],
  }
  const usersSeries = [{ name: 'Users', data: usersData }]

  const salesOptions = {
    chart: { id: 'sales', toolbar: { show: false } },
    xaxis: { categories: salesCategories },
    colors: ['#22c55e'],
  }
  const salesSeries = [{ name: 'Sales', data: salesData }]

  const orderOptions = {
    labels: orderLabels,
    colors: ['#22c55e', '#f59e0b', '#ef4444', '#3b82f6'],
    legend: { position: 'bottom' },
  }

  const radarSeries = [
    {
      name: "This Year",
      data: [80, 50, 30, 40, 100, 20],
    },
    {
      name: "Last Year",
      data: [60, 70, 50, 30, 90, 40],
    },
  ]

  const radarOptions = {
    chart: {
      type: "radar",
      toolbar: { show: false },
    },
    xaxis: {
      categories: ["Sales", "Users", "Orders", "Revenue", "Growth", "Profit"],
    },
    colors: ['#3b82f6', '#ef4444'],
    legend: { position: 'top' },
  }

  const columnSeries = [
    {
      name: "Online",
      data: [7000, 9000, 12000, 15000, 18000, 21000],
    },
    {
      name: "Retail",
      data: [5000, 6000, 6000, 7000, 8000, 9000],
    },
  ]

  const columnOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "45%",
        horizontal: false,
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    colors: ['#3b82f6', '#22c55e'],
    legend: { position: 'top' },
    dataLabels: { enabled: false },
  }

  const gaugeSeries = [75]

  const gaugeOptions = {
    chart: {
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "60%",
        },
        dataLabels: {
          value: {
            fontSize: "24px",
          },
        },
      },
    },
    labels: ["Target Achieved"],
  }

  return (
    <div className="space-y-6">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5 rounded-lg shadow">
          <Users size={28} />
          <h2 className="text-sm mt-3 opacity-80">Total Users</h2>
          <p className="text-2xl font-bold">1,250</p>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-5 rounded-lg shadow">
          <DollarSign size={28} />
          <h2 className="text-sm mt-3 opacity-80">Total Sales</h2>
          <p className="text-2xl font-bold">$12,450</p>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-5 rounded-lg shadow">
          <ShoppingCart size={28} />
          <h2 className="text-sm mt-3 opacity-80">New Orders</h2>
          <p className="text-2xl font-bold">320</p>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-5 rounded-lg shadow">
          <AlertCircle size={28} />
          <h2 className="text-sm mt-3 opacity-80">Pending Issues</h2>
          <p className="text-2xl font-bold">14</p>
        </div>

      </div>

      {/* Graphs Grid (4-4-4 style) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* 1. Users Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-sm font-semibold mb-2">Users Growth</h2>
          <div>
            <Chart options={usersOptions} series={usersSeries} type="line" height={250} />
          </div>
        </div>

        {/* 2. Sales Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-sm font-semibold mb-2">Sales Report</h2>
          <div>
            <Chart options={salesOptions} series={salesSeries} type="bar" height={250} />
          </div>
        </div>

        {/* 3. Orders Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-sm font-semibold mb-2">Order Status</h2>
          <div>
            <Chart options={orderOptions} series={orderSeries} type="pie" height={250} />
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-sm font-semibold mb-3">Performance Radar</h2>
          <Chart options={radarOptions} series={radarSeries} type="radar" height={250} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-sm font-semibold mb-3">Monthly Revenue</h2>
          <Chart options={columnOptions} series={columnSeries} type="bar" height={250} />
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-sm font-semibold mb-3">Target Progress</h2>
          <Chart options={gaugeOptions} series={gaugeSeries} type="radialBar" height={250} />
        </div>

      </div>

      <div className="grid grid-cols-1 gap-4">
        <TopOrderTable />
      </div>
    </div>
  )
}

export default Dashboard