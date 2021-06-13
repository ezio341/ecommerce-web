import { Table } from "antd";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {fetchUser} from '../Action/UserAction'

const UserComponent = (props)=>{
    const [users, setUsers] = useState([])
    const [userLoading, setUserLoading] = useState(true)
    useEffect(() => {
        props.fetchUser()
    }, [])
    useEffect(() => {
        if(props.user.users !== (null || undefined) ){
            setUsers(Object.entries(props.user.users))
            setUserLoading(props.user.loading)
        }
        
    }, [props.user])
    
    const UserTable = () =>{
        const column = [
            {
                title: "Email",
                dataIndex: 0,
                key: "email",
                render: text =>text.replace('_', '.')
            },
            {
                title: "Name",
                dataIndex: 1,
                key: "name",
                render: (info) => {
                    console.log(info)
                    return info.name
                }
            },
            {
                title: "Phone",
                dataIndex: 1,
                key: "phone",
                render: (info) => info.phone
            },
            {
                title: "Address",
                dataIndex: 1,
                key: "address",
                render: (info) => info.address
            }
        ]
        
        return <Table columns={column} dataSource={users} loading={userLoading}/>
    }
    return (
        <UserTable/>
    )
}

const mapStateToProps = (state) =>{
    return {
        ...state
    }
}
const mapDispatchToProps = (dispatch) =>{
    return bindActionCreators({
        fetchUser
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(UserComponent)