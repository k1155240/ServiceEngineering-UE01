var React = require('react');
var Link = require('react-router').Link;

var Layout = React.createClass({
    checkActive(module) {

        var path = this.props.location.pathname;
        console.log("path " + path);
        if(module == '') {
            if((path == '/' || path == '/index.html'))
                return true;
            else
                return false;
        }
        else if(path.indexOf(module) == 0) {
            return true;
        }
        else {
            return false;
        } 
    },

	render(){
        return (
            <div style={{width:'100%'}}> 
                <div className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link to={'/'} className="navbar-brand">Projectmanagement</Link>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav"> 
                                <li className={this.checkActive('') ? 'active' : ''}><Link to={'/'}>Dashboard</Link></li>
                                <li className={this.checkActive('/projects') ? 'active' : ''}><Link to={'/projects/'}>Projects</Link></li>
                                <li className={this.checkActive('/tasks') ? 'active' : ''}><Link to={'/tasks/'}>Tasks</Link></li>
                                <li className={this.checkActive('/problems') ? 'active' : ''}><Link to={'/problems/'}>Problems</Link></li>
                            </ul>
                        </div>
                    </div> 
                </div>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
});

module.exports = Layout;