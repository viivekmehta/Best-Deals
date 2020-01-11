/*global chrome*/
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        var prices = [];
        var titles = [];
        var links = [];
        var images = [];
        var productDetails = [];
        var totalProducts = 0;
        var productsFound = 0;
        console.log("hey the product is ==> " + request.product);
        var url = "https://www.amazon.in/s?k=" + request.product;
        fetch(url)
            .then((res) => {
                return res.text();
            })
            .then((data) => {
                const productDetail = [{ title: {}, price: {}, links: {} }];
                var links1 = $(data).find(".a-link-normal.a-text-normal");
                var titles1 = $(data).find(".a-size-base-plus.a-color-base.a-text-normal,.a-size-medium.a-color-base.a-text-normal");
                var prices1 = $(data).find(".a-price-whole");
                var images1 = $(data).find(".s-image");
                var completeProduct = $(data).find(".s-include-content-margin s-border-bottom");
                for (var j = 0; j < links1.length; j++) {
                    if (links1[j] != undefined) {
                        if (links1[j].className.includes("s-no-hover")) {
                            totalProducts++;
                        }
                    }
                }
                console.log("ok done!!");
                console.log("completeProducts are ==> ");
                var data1 = completeProduct.prevObject.text();
                totalProducts = (links1.length) - totalProducts;
                var titleIndex = 0, linkIndex = 0, priceIndex = 0, imageIndex = 0;
                if (totalProducts > 5) {
                    for (var i = 0; i < 5; i++) {
                        if (links1[linkIndex] != undefined) {
                            if (!links1[linkIndex].className.includes("s-no-hover")) {
                                console.log("titleIndex ==> " + titleIndex);
                                if (titles1[titleIndex] != undefined) {
                                    console.log("hey titleIndex is ==> " + titleIndex + " k is ==> " + linkIndex);
                                    if (!titles1[titleIndex].innerText.includes("Did you mean") && !titles1[titleIndex].innerText.includes("Use fewer")) {
                                        if (prices1[priceIndex] != undefined) {
                                            console.log("now titleIndex is ==> " + titleIndex + " k is ==> " + linkIndex);
                                            productDetails[i] = {
                                                title: titles1[titleIndex].innerText, price: prices1[priceIndex].innerText, link: "https://www.amazon.in" + links1[linkIndex].pathname + links1[linkIndex].search, image: images1[imageIndex].src
                                            };
                                            productsFound++;
                                            linkIndex++;
                                            priceIndex++;
                                            imageIndex++;
                                            titleIndex++;
                                        } else {
                                            linkIndex++;
                                            priceIndex++;
                                            imageIndex++;
                                            titleIndex++;
                                        }
                                    } else {
                                        i = i - 1;
                                        titleIndex++;
                                    }
                                } else {
                                    i = i - 1;
                                    titleIndex++;
                                }
                            } else {
                                i = i - 1;
                                linkIndex++;
                            }
                        } else {
                            i = i - 1;
                            linkIndex++;
                        }
                    }
                } else if (totalProducts !== 0) {
                    for (var i = 0; i < totalProducts; i++) {
                        if (links1[linkIndex] != undefined) {
                            if (!links1[linkIndex].className.includes("s-no-hover")) {
                                console.log("one titleIndex is ==> " + titleIndex);
                                if (titles1[titleIndex] != undefined) {
                                    console.log("two titleIndex is ==> " + titleIndex);
                                    if (!titles1[titleIndex].innerText.includes("Did you mean") && !titles1[titleIndex].innerText.includes("Use fewer")) {
                                        if (prices1[priceIndex] != undefined) {
                                            console.log("three titleIndex is ==> " + titleIndex);
                                            productDetails[i] = {
                                                title: titles1[titleIndex].innerText, price: prices1[priceIndex].innerText, link: "https://www.amazon.in" + links1[linkIndex].pathname + links1[linkIndex].search, image: images1[imageIndex].src
                                            };
                                            productsFound++;
                                            console.log("done");
                                            linkIndex++;
                                            priceIndex++;
                                            imageIndex++;
                                            titleIndex++;
                                        } else {
                                            linkIndex++;
                                            priceIndex++;
                                            imageIndex++;
                                            titleIndex++;
                                        }
                                    } else {
                                        i = i - 1;
                                        titleIndex++;
                                    }
                                } else {
                                    i = i - 1;
                                    titleIndex++;
                                }
                            } else {
                                i = i - 1;
                                linkIndex++;
                            }
                        } else {
                            i = i - 1;
                            linkIndex++;
                        }
                    }
                }
                console.log("product is ==> ");
                console.log(productDetails);
            }).then(() => {
                if (productsFound == 0) {
                    sendResponse({ productDetails: productDetails, anyProductsFound: false })
                } else {
                    sendResponse({ productDetails: productDetails, anyProductsFound: true })
                }
            });
        return true;
    });
