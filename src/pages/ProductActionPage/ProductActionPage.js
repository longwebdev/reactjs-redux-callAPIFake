import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './../../actions/index';

class ProductActionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id : '',
            txtName : '',
            txtPrice : '',
            chkbStatus : ''
        };
    }
    
    componentDidMount(){
        var { match } = this.props;
        if(match){
            var id = match.params.id;
            this.props.onEditProduct(id);
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.itemEditing){
            var { itemEditing } = nextProps;
            this.setState({
                id : itemEditing.id,
                txtName : itemEditing.name,
                txtPrice : itemEditing.price,
                chkbStatus : itemEditing.status,
            });
        }
    }

    onChange =  (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name] : value
        });

    } 
    onSave =  (event) => {
        event.preventDefault();
        var { id, txtName, txtPrice, chkbStatus } = this.state;
        var product = {
            id : id,
            name : txtName,
            price : txtPrice,
            status : chkbStatus
        }
        var { history } = this.props;
        if(id){//update
            this.props.onUpdateProduct(product);
            history.goBack();
        }else{
            this.props.addProduct(product);
            history.goBack();
        }
        
    } 
    render() {
        var { txtName, txtPrice, chkbStatus } = this.state;
        return (
            <div>
                
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    
                    <form onSubmit={this.onSave}>

                    
                        <div className="form-group">
                            <label >Tên Sản Phẩm : </label>
                            <input 
                            type="text" 
                            className="form-control" 
                            name="txtName"
                            value={txtName}
                            onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label >Giá Sản Phẩm : </label>
                            <input 
                            type="number" 
                            className="form-control"  
                            name="txtPrice"
                            value={txtPrice}
                            onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label >Trạng Thái :</label>
                            
                        </div>
                        
                        <div className="checkbox">
                            <label>
                                <input 
                                type="checkbox" 
                                name="chkbStatus"
                                value={chkbStatus} 
                                onChange={this.onChange}
                                checked={chkbStatus}
                                />
                                Còn Hàng
                            </label>
                        </div>
                        
                        <Link to="/product-list" className="btn btn-danger mr-10"> 
                            Trở lại
                        </Link>
                    
                        <button type="submit" className="btn btn-primary">Lưu lại</button>
                    </form>
                    
                </div>
                
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        itemEditing : state.itemEditing
    };
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        addProduct: (product) => {
            dispatch(actions.actADDProductRequest(product));
        },
         onEditProduct :  (id) => {
             dispatch(actions.actGetProductRequest(id));
        },
        onUpdateProduct : (product) => {
            dispatch(actions.actUpdateProductRequest(product));
        } 
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);