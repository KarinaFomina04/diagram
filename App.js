// Модуль для работы с канвасом
const canvasModule = (function () {
    const canvas = document.getElementById("chartCanvas");
    const ctx = canvas.getContext("2d");

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function drawSector(value, radius, startAngle, endAngle, color) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();

        ctx.fillStyle = color;
        ctx.fill();
    }

    return {
        clearCanvas,
        drawSector,
    };
})();

// Модуль для работы с данными и логикой диаграммы
const chartModule = (function (canvasModule) {
    const chartData = generateRandomChartData();
    const colors = generateRandomColors();

    canvasModule.drawSector(
        chartData[0].value,
        chartData[0].radius,
        0,
        chartData[0].angle,
        colors[0]
    );

    const chartContainer = document.querySelector(".chart-container");

    chartContainer.addEventListener("click", () => {
        chartContainer.classList.toggle("enlarged");
        canvasModule.clearCanvas();
        let startAngle = 0;
        chartData.forEach((data, index) => {
            canvasModule.drawSector(
                data.value,
                data.radius,
                startAngle,
                startAngle + data.angle,
                colors[index]
            );
            startAngle += data.angle;
        });
    });

    function generateRandomChartData() {
        const numValues = Math.floor(Math.random() * 8) + 1;
        const data = [];
        let totalValue = 0;
        for (let i = 0; i < numValues; i++) {
            const value = Math.floor(Math.random() * 100) + 1;
            const radius = Math.floor(Math.random() * 100) + 50;
            totalValue += value;
            data.push({ value, radius });
        }
        data.forEach(item => item.angle = (item.value / totalValue) * 2 * Math.PI);
        return data;
    }

    function generateRandomColors() {
        const colors = [];
        for (let i = 0; i < chartData.length; i++) {
            colors.push(getRandomColor());
        }
        return colors;
    }

    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
})(canvasModule);
