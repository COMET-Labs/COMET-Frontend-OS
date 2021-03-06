import React, {useState} from 'react';
import Layout from '../../components/layouts/default';
import Card from '../../components/os/Cards/index';
import CardData from '../../CardData';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {InputGroup, FormControl} from 'react-bootstrap';
import  styles from './os.module.scss';
import {SwipeableDrawer} from '@material-ui/core';
import { useMediaQuery } from 'react-responsive';
import SearchIcon from '@material-ui/icons/Search';

export default function OS(){
    const [open,setOpen] = useState(false);
    const isMobile = useMediaQuery({
        query: '(max-width: 767px)'
      })
    
    const isExtraSmall = useMediaQuery({
    query: '(max-width: 576px)'
    })

    return(
        <Layout darkTheme={false}>
            <div style={{backgroundColor:" rgb(250, 250, 250)"}}>
            <div className="container" style={{maxWidth:"1600px"}}>
                <div className="row">
                    <div className={"col-lg-6 col-md-6 col-sm-12 "+styles.top_heading}>
                        {
                            !isMobile?
                            <h1 style={{
                                color:"#727bf2",
                                marginTop:"20px",
                                paddingLeft:"30px"
                            }}>Trending OS Projects</h1>
                            :
                            <h1 style={{
                                color:"#727bf2",
                                marginTop:"20px",
                                textAlign:"center"
                            }}>Trending OS Projects</h1>
                        }
                        
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12" 
                    style={{display:"flex",
                    marginTop:"30px"}}>
                        <div className="container">
                            <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-6">
                            <InputGroup>
                                <FormControl className={styles.bar}/>
                                <InputGroup.Append>
                                <InputGroup.Text className={styles.bar}><i className={`${styles.fa} fa fa-search`}></i></InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                {!isExtraSmall
                                ?
                                <button className={styles.create_project}>Create Project</button>
                                :
                                <button className={styles.create_project_mobile}>Create Project</button>
                            }
                            
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-12">
                        {/* Keep the code for search section here */}
                        {/* This is the search section */}
                        {!isMobile?
                        <div className={styles.card}>
                        <div className="container">
                            <div className={styles.search}>
                            <InputGroup>
                                <FormControl className={styles.bar}/>
                                <InputGroup.Append>
                                <InputGroup.Text className={styles.bar}><i className={`${styles.fa} fa fa-search`}></i></InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                            </div>
                            <div className={styles.title}>Search Results</div>
                            <p className={styles.text}>Graphic Designing</p>
                            <p className={styles.text}>Design</p>
                            <p className={styles.text}>Graphics</p>
                            <p className={styles.text}>Another Search Result</p>
                            <a className={styles.link} href="#">Load More..</a>
                            <div className={styles.title}>Popular Topics</div>
                            <p className={styles.text}>Name of the topic</p>
                            <p className={styles.text}>Name of another topic</p>
                            <p className={styles.text}>Topic name</p>
                            <p className={styles.text}>One more topic name</p>
                            <div className={styles.title}>Recent Searches</div>
                            <p className={styles.text}>Name of the topic</p>
                            <p className={styles.text}>Name of another topic</p>
                            <p className={styles.text}>Topic name</p>

                        </div>
                    </div>
                    :<div>
                        <SwipeableDrawer open={open}
                            onClose={()=>setOpen(false)}
                            onOpen={()=>setOpen(true)}
                            PaperProps={{style: {minWidth:"50vw"}}}
                            >
                            <div className="container">
                                    <div className={styles.search}>
                                            <InputGroup>
                                                <FormControl className={styles.bar}/>
                                                <InputGroup.Append>
                                                    <InputGroup.Text className={styles.bar}><i className={`${styles.fa} fa fa-search`}></i></InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                    </div>
                                    <div className={styles.title}>Search Results</div>
                                            <p className={styles.text}>Graphic Designing</p>
                                            <p className={styles.text}>Design</p>
                                            <p className={styles.text}>Graphics</p>
                                            <p className={styles.text}>Another Search Result</p>
                                            <a className={styles.link} href="#">Load More..</a>
                                    <div className={styles.title}>Popular Topics</div>
                                            <p className={styles.text}>Name of the topic</p>
                                            <p className={styles.text}>Name of another topic</p>
                                            <p className={styles.text}>Topic name</p>
                                            <p className={styles.text}>One more topic name</p>
                                    <div className={styles.title}>Recent Searches</div>
                                            <p className={styles.text}>Name of the topic</p>
                                            <p className={styles.text}>Name of another topic</p>
                                            <p className={styles.text}>Topic name</p>

                                </div>
                            </SwipeableDrawer>
                    </div>
                    }
                        
                    </div>
                    <div className="col-lg-9 col-md-9 col-sm-12" 
                    style={{marginTop:"10px",marginBottom:"10px"}}>
                        <div className="container">
                            <div className="row">
                                {CardData.map((data,index)=>{
                                    return(
                                        <div className="col-lg-6 col-md-12 col-sm-12">
                                            <Card params={data} />
                                        </div>
                                    )
                                })}
                        </div>
                        </div>
                        {isMobile?
                        <div>
                            <button 
                            style={{position:"fixed",
                            bottom:"15px",
                            color:"white",
                            backgroundColor:"#727bf2",
                            opacity:"0.8",
                            border:"none",
                            borderRadius:"50%",
                            height:"50px",
                            width:"50px",
                            outline:"none"}}
                            onClick={()=>{setOpen(true)}}
                            >
                                <SearchIcon></SearchIcon>
                            </button>
                        </div>
                        :
                        <div>
                        </div>}
                    </div>
                </div>
            </div>
            </div>
        </Layout>
    )
}