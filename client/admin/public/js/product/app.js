new Vue({
    el: '#app',
    data: function() {
        return {
            tableData: [],

            listData: {
                tabsMain: [{
                        label: 'Tất Cả Sản Phẩm',
                        name: 'index'
                    },
                    {
                        label: 'Theo Dõi',
                        name: 'follow'
                    },
                    {
                        label: 'Chú Ý',
                        name: 'note'
                    },
                    {
                        label: 'Thùng Rác',
                        name: 'delete'
                    }
                ],

                optionsSelect: [{
                        _id: '0',
                        name: 'Ngưng Hoạt Động'
                    },
                    {
                        _id: '1',
                        name: 'Mở Hoạt Động'
                    },
                    {
                        _id: '2',
                        name: 'Theo Dõi'
                    },
                    {
                        _id: '3',
                        name: 'Xoá Sản Phẩm'
                    }
                ],

                timelineHistory: [{
                        contents: 'Phương Vy đã thay đổi sản phẩm',
                        timestamp: '02/10/2021'
                    },
                    {
                        contents: 'Phương Vy đã thay đổi sản phẩm',
                        timestamp: '02/10/2021'
                    },
                    {
                        contents: 'Phương Vy đã thay đổi sản phẩm',
                        timestamp: '02/10/2021'
                    },
                    {
                        contents: 'Phương Vy đã thay đổi sản phẩm',
                        timestamp: '02/10/2021'
                    },
                    {
                        contents: 'Phương Vy đã thay đổi sản phẩm',
                        timestamp: '02/10/2021'
                    }
                ],

                tabsHistory: [{
                        name: 'allHis',
                        label: 'Tổng Lịch Sử',
                    },
                    {
                        name: 'accessHis',
                        label: 'Lịch Sử Truy Cập'
                    },
                    {
                        name: 'hisChange',
                        label: 'Lịch Sử Thay Đổi'
                    }
                ],

                listCategory: [],
                listGroupCategory: [],
            },

            title: 'Quản Lý Sản Phẩm',
            multipleSelection: [],
            // !API
            api: {
                passwordAPI: '',
                userAPI: 'Phuongvy-nt',
                keyAPI: 'phuongvy_14102021_199',
                ip: '172.80.2.1',
                linkAPI: 'http://localhost:5000/',
            },

            showTable: {
                showCategory: true,
                showDescribe: false,
                showPrice: true,
                showUser: false,
                showTime: false,
            },

            searchForm: {
                dateStart: '',
                dateEnd: '',
                priceStart: '',
                priceEnd: '',
            },

            commonForm: {
                commonTabMain: {

                },
            },

            productForm: {
                name: '',
                image: '',
                code: '',
                price: 0,
                view: 1,
                describe: '',
                content: '',
                percentDiscount: 0,
                active: true,
                category: []
            },

            categoryForm: {
                name: ''
            },

            productValidate: {
                name: [{
                        required: true,
                        message: 'Vui lòng nhập mã sản phẩm',
                        trigger: 'blur'
                    },
                    {
                        max: 200,
                        message: 'Không được phép vượt quá 200 ký tự',
                        trigger: 'blur'
                    }
                ],

                code: [{
                    max: 50,
                    message: 'Không được phép vượt quá 50 ký tự',
                    trigger: 'blur'
                }],

                percentDiscount: [{
                    pattern: /^[0-9]$|^[1-9][0-9]$|^(100)$/,
                    message: 'Chỉ nhập số từ 0 - 100',
                    trigger: 'blur'
                }, ],

                describe: [{
                    max: 500,
                    message: 'Không được phép vượt quá 500 ký tự',
                    trigger: 'blur'
                }],

                price: [{
                    pattern: /^[0-9]*$/,
                    message: 'Không được phép nhập chữ',
                    trigger: 'blur'
                }, ],

            },

            categoryValidate: {
                name: [{
                    required: true,
                    message: 'Vui lòng nhập tên danh mục',
                    trigger: 'blur'
                }]
            },

            searchValidate: {

            },

            activeName: 'index',
            activeDetails: 'info',
            acticeHis: 'allHis',
            optionalValue: '',
            search: '',
            listItem: [],
            labelPositionTop: 'top',
            dialogFormCreateNewVisible: false,
            dialogFormDetailProduct: false,
            fileList: [],
            imageUpload: 'images/image-product/common/no-imgae.png',
            isUploadImage: false,
            isHoverCate: false,
            createCate: '',
            titleCreate: '',
            loadingCate: false,
            loadingTableProduct: false,
            titlelabel: 'Tổng lịch sử',
            visibleDelete: false,
        }
    },

    mounted() {
        this.loadProduct();
        this.loadCategory();
        this.loadCategoryProduct();
    },

    methods: {
        // Sự kiện load
        loadProduct() {
            let that = this;
            that.loadingTableProduct = true;
            const link = that.api.linkAPI + 'product/get-product';
            axios.get(link, {
                    params: JSON.parse(JSON.stringify(that.api))
                })
                .then(function(response) {
                    // handle success
                    if (response.data.success) {
                        if (response.status === 200) {
                            that.tableData = response.data.data;
                            setTimeout(function() {
                                that.loadingTableProduct = false;
                            }, 1000);
                        } else {
                            that.$message({
                                message: 'Quá trình tải đang bị gián đoạn! Vui lòng tải lại.',
                                type: 'warning'
                            });
                        }
                    } else {
                        that.$message({
                            message: 'Quá trình tải đang bị gián đoạn! Vui lòng tải lại.',
                            type: 'warning'
                        });
                    }
                })
                .catch(function(error) {
                    // handle error
                });
        },

        loadBinProduct() {
            let that = this;
            that.loadingTableProduct = true;
            const link = that.api.linkAPI + 'product/get-product-bin';
            axios.get(link, {
                    params: JSON.parse(JSON.stringify(that.api))
                })
                .then(function(response) {
                    // handle success
                    if (response.data.success) {
                        if (response.status === 200) {
                            that.tableData = response.data.data;
                            setTimeout(function() {
                                that.loadingTableProduct = false;
                            }, 1000);
                        } else {
                            that.$message({
                                message: 'Quá trình tải đang bị gián đoạn! Vui lòng tải lại.',
                                type: 'warning'
                            });
                        }
                    } else {
                        that.$message({
                            message: 'Quá trình tải đang bị gián đoạn! Vui lòng tải lại.',
                            type: 'warning'
                        });
                    }
                })
                .catch(function(error) {
                    // handle error
                });
        },

        loadNoteProduct() {
            let that = this;
            that.loadingTableProduct = true;
            const link = that.api.linkAPI + 'product/get-product-note';
            axios.get(link, {
                    params: JSON.parse(JSON.stringify(that.api))
                })
                .then(function(response) {
                    // handle success
                    if (response.data.success) {
                        if (response.status === 200) {
                            that.tableData = response.data.data;
                            setTimeout(function() {
                                that.loadingTableProduct = false;
                            }, 1000);
                        } else {
                            that.$message({
                                message: 'Quá trình tải đang bị gián đoạn! Vui lòng tải lại.',
                                type: 'warning'
                            });
                        }
                    } else {
                        that.$message({
                            message: 'Quá trình tải đang bị gián đoạn! Vui lòng tải lại.',
                            type: 'warning'
                        });
                    }
                })
                .catch(function(error) {
                    // handle error
                });
        },

        loadFollowProduct() {
            let that = this;
            that.loadingTableProduct = true;
            const link = that.api.linkAPI + 'product/get-product-follow';
            axios.get(link, {
                    params: JSON.parse(JSON.stringify(that.api))
                })
                .then(function(response) {
                    // handle success
                    if (response.data.success) {
                        if (response.status === 200) {
                            that.tableData = response.data.data;
                            setTimeout(function() {
                                that.loadingTableProduct = false;
                            }, 1000);
                        } else {
                            that.$message({
                                message: 'Quá trình tải đang bị gián đoạn! Vui lòng tải lại.',
                                type: 'warning'
                            });
                        }
                    } else {
                        that.$message({
                            message: 'Quá trình tải đang bị gián đoạn! Vui lòng tải lại.',
                            type: 'warning'
                        });
                    }
                })
                .catch(function(error) {
                    // handle error
                });
        },

        loadCategory() {
            let that = this;
            const link = that.api.linkAPI + '/product/category/get-category';
            axios.get(link, {
                    params: JSON.parse(JSON.stringify(that.api))
                })
                .then(function(response) {
                    // handle success
                    if (response.data.success) {
                        if (response.status === 200) {
                            that.listData.listCategory = response.data.data;
                        } else {
                            that.$message({
                                message: 'Quá trình tải đang bị gián đoạn! Vui lòng tải lại.',
                                type: 'warning'
                            });
                        }
                    } else {
                        that.$message({
                            message: 'Quá trình tải đang bị gián đoạn! Vui lòng tải lại.',
                            type: 'warning'
                        });
                    }
                })
                .catch(function(error) {
                    // handle error
                });
        },

        loadCategoryProduct() {
            let that = this;
            const link = that.api.linkAPI + '/product/category/get-groupcategory';
            axios.get(link, {
                    params: JSON.parse(JSON.stringify(that.api))
                })
                .then(function(response) {
                    // handle success
                    if (response.data.success) {
                        if (response.status === 200) {
                            that.listData.listGroupCategory = response.data.data;
                        } else {
                            that.$message({
                                message: 'Quá trình tải đang bị gián đoạn! Vui lòng tải lại.',
                                type: 'warning'
                            });
                        }
                    } else {
                        that.$message({
                            message: 'Quá trình tải đang bị gián đoạn! Vui lòng tải lại.',
                            type: 'warning'
                        });
                    }
                })
                .catch(function(error) {
                    // handle error
                });
        },


        // sự kiện Click
        clickBtnCreateProductNew() {
            let that = this;
            that.dialogFormCreateNewVisible = true;
            that.titleCreate = "Thêm Sản Phẩm Mới";
            that.createCate = "Thêm Danh Mục";
        },

        clickCateNewProduct() {
            let that = this;
            if (that.isHoverCate == false) {
                that.loadingCate = true;
                that.createCate = "Đóng Danh Mục";
                that.isHoverCate = true;
                setTimeout(function() {
                    that.loadingCate = false;
                }, 1000);
            } else {
                that.isHoverCate = false;
                that.createCate = "Thêm Danh Mục";
            }
        },

        clickBtnDetail(row) {
            let that = this;
            that.dialogFormDetailProduct = true;
            that.productForm = JSON.parse(JSON.stringify(row));
            that.loadCategoryProduct();
            that.title = "Chi Tiết Sản Phẩm - " + row.name;

            that.view = row.view;
            that.name = row.name;
            that.dateCreate = row.dateCreate;
            that.dateModified = row.dateModified;
            that.userCreate = row.userCreate;
            that.userModified = row.userModified;
            that.content = row.content;
            that.describe = row.describe;

            that.activeText = row.active ? 'Hoạt Động' : 'Không Hoạt Động';
            that.activeColor = row.active ? 'success' : 'default';

            that.followText = row.follow ? 'Theo Dõi' : 'Không Có Theo Dõi';
            that.followColor = row.follow ? 'success' : 'default';

            that.noteText = row.note ? 'Chú Ý' : 'Không Chú Ý';
            that.noteColor = row.note ? 'warning' : 'default';

            that.binText = row.bin ? 'Yes' : 'No';
            that.binColor = row.bin ? 'danger' : 'default';
        },

        // Sự kiện chức năng

        createNewProduct(productForm) {
            let that = this;
            that.$refs[productForm].validate((valid) => {
                if (valid) {
                    const link = that.api.linkAPI + 'product/create-product';

                    const formData = new FormData();
                    formData.append('file', that.productForm.image);

                    axios.post(link, formData, {
                            params: JSON.parse(JSON.stringify(that.productForm))
                        })
                        .then(function(response) {
                            // handle success
                            if (response.data.success) {
                                if (response.status === 200) {
                                    that.$notify({
                                        title: 'Thông Báo',
                                        message: 'Thêm Sản Phẩm [ ' + that.productForm.name + ' ] Thành Công',
                                        type: 'success'
                                    });
                                    that.dialogFormCreateNewVisible = false;
                                    that.$refs[productForm].resetFields();
                                    that.loadProduct();
                                    that.deleteImage(that.productForm);
                                }
                            } else {
                                that.$notify.error({
                                    title: 'Thông Báo',
                                    message: 'Sản Phẩm Chưa Được Thêm',
                                });
                            }
                        })
                        .catch(function(error) {
                            // handle error
                            that.$notify.error({
                                title: 'Thông Báo',
                                message: 'Lỗi! Không Thể Thêm Sản Phẩm',
                            });
                        })
                        .then(function() {
                            // always executed
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        createNewCate(categoryForm) {
            let that = this;
            that.$refs[categoryForm].validate((valid) => {
                if (valid) {
                    const link = that.api.linkAPI + 'product/category/create?name=' + that.categoryForm.name;
                    axios.post(link)
                        .then(function(response) {
                            if (response.data.success) {
                                that.$notify({
                                    title: 'Thông Báo',
                                    message: 'Thêm Danh Mục [' + that.categoryForm.name + '] Thành Công',
                                    type: 'success'
                                });
                                that.clickCateNewProduct();
                                that.loadCategory();
                                that.$refs[categoryForm].resetFields();
                            } else {
                                that.$notify({
                                    title: 'Thông Báo',
                                    message: 'Xảy Ra Lỗi! Vui Lòng Kiểm Tra Lại Dữ Liệu',
                                    type: 'warning'
                                });
                            }
                        })
                        .catch(function(error) {
                            that.$notify({
                                title: 'Thông Báo',
                                message: 'Xảy Ra Lỗi! Vui Lòng Kiểm Tra Lại Dữ Liệu',
                                type: 'warning'
                            });
                        });
                } else {
                    this.$notify.error({
                        title: 'Lỗi',
                        message: 'Không Thể Thêm Dữ Liệu'
                    });
                    return false;
                }
            });
        },

        deleteProduct(id) {
            let that = this;
            const link = that.api.linkAPI + 'product/delete-product/bin?_id=' + id;
            axios.post(link)
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                })
                .then(function() {
                    // always executed
                });
        },


        //uploadImg
        uploadImage(productForm) {
            let that = this;
            const file = document.querySelector('input[type=file]').files[0];
            const reader = new FileReader();
            that.isUploadImage = true;

            reader.addEventListener("load", function() {
                // convert image file to base64 string
                that.imageUpload = reader.result;
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }
            that.productForm.image = file;
        },

        deleteImage(productForm) {
            let that = this;
            that.imageUpload = 'images/image-product/common/no-imgae.png';
            that.productForm.image = '';
            that.isUploadImage = false;
        },


        // Sự kiện chuyển

        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.listItem = val;
        },

        handleClickTabMain() {
            let that = this;
            if (that.activeName === 'index') {
                that.loadProduct();
                that.loadCategoryProduct();
            } else if (that.activeName === 'delete') {
                that.loadBinProduct();
                that.loadCategoryProduct();
            } else if (that.activeName === 'follow') {
                that.loadFollowProduct();
                that.loadCategoryProduct();
            } else if (that.activeName === 'note') {
                that.loadNoteProduct();
                that.loadCategoryProduct();
            } else {
                return false;
            }
        },

        handleClickDetails(tab, event) {
            console.log(tab, event);
        },

        handleChange(value) {},

        handleRemove(file, fileList) {
            console.log(file, fileList);
        },

        handlePreview(file) {
            console.log(file);
        },

        handleClickDetails() {
            let that = this;
            that.activeHis = 'allHis';
            if (that.activeDetail == 'history') {
                that.titlelabel = "Tổng Lịch Sử";
            } else {
                console.log("Lỗi!!!!");
            }
        },

        handleClickHistory() {
            let that = this;
            if (that.activeHis == 'accessHis') {
                that.titlelabel = "Lịch Sử Truy Cập";
            } else if (that.activeHis == 'hisChange') {
                that.titlelabel = "Lịch Sử Thay Đối";
            } else if (that.activeHis == 'allHis') {
                that.titlelabel = "Tổng Lịch Sử";
            } else {
                console.log("Lỗi!!!!");
            }
        },

        // Tìm kiếm

        searchByProduct(searchForm) {
            let that = this;
            console.log(that.searchForm);
        },

        createOption() {
            let that = this;
            if (that.listItem.length > 0) {
                if (that.optionalValue != '') {
                    console.log(that.listItem);
                    console.log(that.optionalValue);
                } else {
                    that.$message({
                        message: 'Vui lòng chọn thao tác',
                        type: 'warning'
                    });
                }
            } else {
                that.$message({
                    message: 'Vui lòng chọn ít nhất 1 dữ liệu',
                    type: 'warning'
                });
            }
        },

        // Format
        formatPrice(price) {
            return price.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND'
            });
        },

        priceFormat(price) {
            return this.formatPrice(price);
        },

        formatSumPrice(price, percentDiscount) {
            const formatSum = price * (100 - percentDiscount) / 100;
            return this.formatPrice(formatSum);
        },

        formatDate(date) {
            const dateNew = new Date(date);
            return dateNew.toLocaleString();
        },

        formatDateCreate(date) {
            return this.formatDate(date);
        },

        formatDateModify(date) {
            return this.formatDate(date);
        },

        // restForm
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.deleteImage(formName);
        },
    }
})