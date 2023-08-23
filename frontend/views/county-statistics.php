<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document2</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="src/styles/county-statistics.css">
    <link rel="stylesheet" href="src/styles/county-statistics-responsive.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.min.js"></script>

</head>

<body>

    <section id="county-statistics">
        <h1 class="anim" data-animtype="from-top" data-animdelay="0s">Detalii despre șomaj al judetului </h1>
        <div class="charts">
            <div class="bar-chart">
                <div class="text-bar">
                    <h1>Statistici pe grupe de vârstă</h1>
                </div>
                <div class="dropdown-bar">
                    <h1>Alege luna si anul pentru comparare: </h1>
                    <select class="month-bar" id="monthBar">
                        <option value="1">Ianuarie</option>
                        <option value="2">Februarie</option>
                        <option value="3">Martie</option>
                        <option value="4">Aprilie</option>
                        <option value="5">Mai</option>
                        <option value="6">Iunie</option>
                        <option value="7">Iulie</option>
                        <option value="8">August</option>
                        <option value="9">Septembrie</option>
                        <option value="10">Octombrie</option>
                        <option value="11">Noiembrie</option>
                        <option value="12">Decembrie</option>
                    </select>
                    <select class="year-bar" id="yearBar">
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                    </select>
                </div>
                <canvas class="chart-canvas" id="barChart"></canvas>
                <div class="buttons-bar">
                    <button id="download-chart-bar" class="download-button"><i class="fa fa-download"></i> Descarca
                        grafic</button>
                    <button id="download-data-bar" class="download-button"><i class="fa fa-download"></i> Descarca
                        datele</button>
                </div>
            </div>
            <div class="doughnut-chart">
                <div class="text-doughnut">
                    <h1>Statistici după gen</h1>
                </div>
                <div class="dropdown-doughnut">
                    <h1>Alege luna si anul pentru comparare: </h1>
                    <select class="month-doughnut" id="monthDoughnut">
                        <option value="1">Ianuarie</option>
                        <option value="2">Februarie</option>
                        <option value="3">Martie</option>
                        <option value="4">Aprilie</option>
                        <option value="5">Mai</option>
                        <option value="6">Iunie</option>
                        <option value="7">Iulie</option>
                        <option value="8">August</option>
                        <option value="9">Septembrie</option>
                        <option value="10">Octombrie</option>
                        <option value="11">Noiembrie</option>
                        <option value="12">Decembrie</option>
                    </select>
                    <select class="year-doughnut" id="yearDoughnut">
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                    </select>
                </div>
                <canvas class="chart-canvas" id="doughnutChart"></canvas>
                <div class="buttons-doughnut">
                    <button id="download-chart-doughnut" class="download-button"><i class="fa fa-download"></i> Descarca
                        grafic</button>
                    <button id="download-data-doughnut" class="download-button"><i class="fa fa-download"></i> Descarca
                        datele</button>
                </div>
                <canvas class="chart-canvas" id="femaleChart"></canvas>
            </div>
            <div class="line-chart">
                <div class="text-line">
                    <h1>Statistici pe număr total de șomeri</h1>
                </div>
                <div class="dropdown-line">
                    <h1>Alege intervalul de timp: </h1>
                    <select class="month-from" id="monthFrom">
                        <option value="1">Ianuarie</option>
                        <option value="2">Februarie</option>
                        <option value="3">Martie</option>
                        <option value="4">Aprilie</option>
                        <option value="5">Mai</option>
                        <option value="6">Iunie</option>
                        <option value="7">Iulie</option>
                        <option value="8">August</option>
                        <option value="9">Septembrie</option>
                        <option value="10">Octombrie</option>
                        <option value="11">Noiembrie</option>
                        <option value="12">Decembrie</option>
                    </select>
                    <select class="year-from" id="yearFrom">
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                    </select>
                    <p class="line">-</p>
                    <select class="month-to" id="monthTo">
                        <option value="1">Ianuarie</option>
                        <option value="2">Februarie</option>
                        <option value="3">Martie</option>
                        <option value="4">Aprilie</option>
                        <option value="5">Mai</option>
                        <option value="6">Iunie</option>
                        <option value="7">Iulie</option>
                        <option value="8">August</option>
                        <option value="9">Septembrie</option>
                        <option value="10">Octombrie</option>
                        <option value="11">Noiembrie</option>
                        <option value="12">Decembrie</option>
                    </select>
                    <select class="year-to" id="yearTo">
                        <option value="2021">2021</option>
                        <option value="2020">2020</option>
                    </select>
                </div>
                <canvas class="chart-canvas" id="lineChart"></canvas>
                <div class="buttons-line">
                    <button id="download-chart-line" class="download-button"><i class="fa fa-download"></i> Descarca
                        grafic</button>
                    <button id="download-data-line" class="download-button"><i class="fa fa-download"></i> Descarca
                        datele</button>
                </div>
            </div>
        </div>
    </section>

    <script src="src/script/animations.js"></script>
    <script type="module" src="src/script/chart-diagram.js"></script>
    <script src="src/script/counties.js"></script>
    <script type="module" src="src/script/parse-url-query-string.js"></script>

</body>

</html>