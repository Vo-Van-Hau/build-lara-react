<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" type="text/css">
    <script type="text/javascript" src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.bundle.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <title>Invoice</title>
    <style>
        body{
            background-color: #000;
        }
        .padding{
            padding: 2rem !important;
        }
        .card {
            margin-bottom: 30px;
            border: none;
            -webkit-box-shadow: 0px 1px 2px 1px rgba(154, 154, 204, 0.22);
            -moz-box-shadow: 0px 1px 2px 1px rgba(154, 154, 204, 0.22);
            box-shadow: 0px 1px 2px 1px rgba(154, 154, 204, 0.22);
        }
        .card-header {
            background-color: #fff;
            border-bottom: 1px solid #e6e6f2;
        }
        h3 {
            font-size: 20px;
        }
        h5 {
            font-size: 15px;
            line-height: 26px;
            color: #3d405c;
            margin: 0px 0px 15px 0px;
            font-family: 'Circular Std Medium';
        }
        .text-dark {
            color: #3d405c !important;
        }
    </style>
</head>
<body>
    <div class="offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12 padding">
        <div class="card">
            <div class="card-header p-4">
                <a class="pt-2 d-inline-block" href="index.html" data-abc="true">MS-Mall.com</a>
                <div class="float-right"> <h3 class="mb-0">Invoice #BBB10234</h3>
                    Date: 12 Jun, 2022
                </div>
            </div>
            <div class="card-body">
                <div class="row mb-4">
                    <div class="col-sm-6">
                        <h5 class="mb-3">From:</h5>
                        <h3 class="text-dark mb-1">Tejinder Singh</h3>
                        <div>29, Singla Street</div>
                        <div>Sikeston,New Delhi 110034</div>
                        <div>Email: contact@bbbootstrap.com</div>
                        <div>Phone: +91 9897 989 989</div>
                    </div>
                    <div class="col-sm-6">
                        <h5 class="mb-3">To:</h5>
                        <h3 class="text-dark mb-1">Akshay Singh</h3>
                        <div>478, Nai Sadak</div>
                        <div>Chandni chowk, New delhi, 110006</div>
                        <div>Email: info@tikon.com</div>
                        <div>Phone: +91 9895 398 009</div>
                    </div>
                </div>
                <div class="table-responsive-sm">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th class="center">#</th>
                                <th>Item</th>
                                <th>Description</th>
                                <th class="right">Price</th>
                                <th class="center">Qty</th>
                                <th class="right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="center">1</td>
                                <td class="left strong">Iphone 10X</td>
                                <td class="left">Iphone 10X with headphone</td>
                                <td class="right">$1500</td>
                                <td class="center">10</td>
                                <td class="right">$15,000</td>
                            </tr>
                            <tr>
                                <td class="center">2</td>
                                <td class="left">Iphone 8X</td>
                                <td class="left">Iphone 8X with extended warranty</td>
                                <td class="right">$1200</td>
                                <td class="center">10</td>
                                <td class="right">$12,000</td>
                            </tr>
                            <tr>
                                <td class="center">3</td>
                                <td class="left">Samsung 4C</td>
                                <td class="left">Samsung 4C with extended warranty</td>
                                <td class="right">$800</td>
                                <td class="center">10</td>
                                <td class="right">$8000</td>
                            </tr>
                            <tr>
                                <td class="center">4</td>
                                <td class="left">Google Pixel</td>
                                <td class="left">Google prime with Amazon prime membership</td>
                                <td class="right">$500</td>
                                <td class="center">10</td>
                                <td class="right">$5000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row">
                    <div class="col-lg-4 col-sm-5"></div>
                    <div class="col-lg-4 col-sm-5 ml-auto">
                        <table class="table table-clear">
                                <tbody>
                                <tr>
                                <td class="left">
                                <strong class="text-dark">Subtotal</strong>
                                </td>
                                <td class="right">$28,809,00</td>
                                </tr>
                                <tr>
                                <td class="left">
                                <strong class="text-dark">Discount (20%)</strong>
                                </td>
                                <td class="right">$5,761,00</td>
                                </tr>
                                <tr>
                                <td class="left">
                                <strong class="text-dark">VAT (10%)</strong>
                                </td>
                                <td class="right">$2,304,00</td>
                                </tr>
                                <tr>
                                <td class="left">
                                <strong class="text-dark">Total</strong>
                                </td>
                                <td class="right">
                                <strong class="text-dark">$20,744,00</strong>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="card-footer bg-white"><p class="mb-0">BBBootstrap.com, Sounth Block, New delhi, 110034</p></div>
        </div>
    </div>
</body>
</html>
