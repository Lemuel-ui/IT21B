class SalesChart {
    constructor(dataUrl) {
        this.dataUrl = dataUrl;
        this.monthlySalesData = null;
        this.categorySalesData = null;
    }

    async fetchData() {
        try {
            const response = await fetch(this.dataUrl);
            const data = await response.json();
            this.monthlySalesData = data.monthlySales;
            this.categorySalesData = data.categorySales;
            this.renderCharts();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    renderCharts() {
        this.renderBarChart();
        this.renderPieChart();
    }

    renderBarChart() {
        const ctx = document.getElementById("barChart").getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: this.monthlySalesData.labels,
                datasets: [{
                    label: "Monthly Shoe Sales",
                    data: this.monthlySalesData.values,
                    backgroundColor: "rgba(54, 162, 235, 0.6)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: "Sales in Units" }
                    }
                }
            }
        });
    }

    renderPieChart() {
        const ctx = document.getElementById("pieChart").getContext("2d");
        new Chart(ctx, {
            type: "pie",
            data: {
                labels: this.categorySalesData.labels,
                datasets: [{
                    label: "Sales by Category",
                    data: this.categorySalesData.values,
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top"
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${context.label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
}

const salesChart = new SalesChart("chart.json");
salesChart.fetchData();