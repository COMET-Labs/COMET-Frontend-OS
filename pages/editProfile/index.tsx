import {useState,useEffect} from 'react';
import Layout from '../../components/layouts/default';
import styles from './editProfile.module.scss';
import Grid from '@material-ui/core/Grid';
import { useMediaQuery } from 'react-responsive';
import MenuIcon from '@material-ui/icons/Menu';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import TextField from '@material-ui/core/TextField';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from '@material-ui/core/Slider';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

toast.configure();

const useStyles = makeStyles((theme) => ({
    textField: {
      marginTop: theme.spacing(2),
      width: 200,
      border: "1px solid gray",
      borderRadius: "10px",
      padding:"5px",
    },
  }));

const PrettoSlider = withStyles({
root: {
    color: '#767bfe',
    height: 8,
    width:"75%"
},
thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#1bc47d',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
    boxShadow: 'inherit',
    },
},
active: {},
valueLabel: {
    left: 'calc(-50% + 6px)',
},
track: {
    height: 12,
    borderRadius: 6,
},
rail: {
    height: 7,
    borderRadius: 4,
    marginTop:"2px"
},
})(Slider);

export default function editProfile(){
    const classes = useStyles();
    const [step, setStep] = useState(4);
    const [selectedStep, setSelectedStep] = useState(4);

    //TOASTS

    const successToast = (message)=>{
        toast.success(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

    const errorToast = (message)=>{
        toast.error(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

    //STATE HOOK FOR DRAWER FOR SIDE SECTION ON SMALL WIDTH DEVICES
    const [open, setOpen] = useState(false);

    //STATE HOOKS FOR WORK EXPERIENCE
    const [workExperience, setWorkExperience] = useState([]);
    const [selectedWorkExperience, setSelectedWorkExperience] = useState(-1);
    const [workExperienceName, setWorkExperienceName] = useState("");
    const [workExperienceImage, setWorkExperienceImage] = useState("https://images.unsplash.com/photo-1600456899121-68eda5705257?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1125&q=80");
    const [workExperienceJoiningDate, setWorkExperienceJoiningDate] = useState(undefined);
    const [workExperienceEndDate, setWorkExperienceEndDate] = useState(undefined);
    const [workExperienceDescription, setWorkExperienceDescription] = useState("");

    //STATE HOOKS FOR PROJECTS
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(-1);
    const [projectName, setProjectName] = useState("");
    const [projectImage, setProjectImage] = useState("https://images.unsplash.com/photo-1600456899121-68eda5705257?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1125&q=80");
    const [projectStartingDate, setProjectStartingDate] = useState(undefined);
    const [projectEndDate, setProjectEndDate] = useState(undefined);
    const [projectDescription, setProjectDescription] = useState("");
    const [projectLink, setProjectLink] = useState("");

    //STATE HOOKS FOR SKILLS
    const [skills, setSkills] = useState([]);
    const [skillValue, setSkillValue] = useState(50);
    const [skillName, setSkillName] = useState("");

    //STATE HOOKS FOR CLUB MEMBERSHIPS
    const [clubs, setClubs] = useState([
        {
            name: "Coding",
            joined: false
        },
        {
            name: "Quantum Computing",
            joined: false
        },
        {
            name: "Cloud Computing",
            joined: false
        },
        {
            name: "Robotics",
            joined: false
        },
        {
            name: "IOT",
            joined: false
        },
        {
            name: "Machine Learning",
            joined: false
        },
    ]);

    //RELEAVANT FUNCTIONS FOR WORK EXPERIENCE
    const setImageWE = (e)=>{
        var input = e.target;
        var reader = new FileReader();
        reader.onload = function(){
            var dataUrl: string = reader.result as string;
            setWorkExperienceImage(dataUrl);
        }
        reader.readAsDataURL(input.files[0]);
    }

    const addWorkExperience = (index)=>{
        if(workExperienceName!==""){
            if(workExperienceImage!=="https://images.unsplash.com/photo-1600456899121-68eda5705257?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1125&q=80"){
                if(workExperienceJoiningDate!==undefined){
                    if(workExperienceEndDate!==undefined){
                        if(workExperienceDescription!==""){
                            const workExpObject = {
                                name: workExperienceName,
                                image: workExperienceImage,
                                joinDate: workExperienceJoiningDate,
                                endDate: workExperienceEndDate,
                                description: workExperienceDescription
                            };
                            if(index===-1){
                                setWorkExperience([...workExperience, workExpObject]);
                            }else{
                                const workExpArray = workExperience;
                                workExpArray[index] = workExpObject;
                                setWorkExperience(workExpArray);
                                setSelectedWorkExperience(-1);
                            }
                            
                            setWorkExpHooks("",
                            "https://images.unsplash.com/photo-1600456899121-68eda5705257?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1125&q=80",
                            undefined,
                            undefined,
                            "")
                            successToast("Saved work experience successfully");
                        }else{
                            errorToast("Please enter work description");
                        }
                    }else{
                        errorToast("Please select an end date");
                    }
                }else{
                    errorToast("Please select a joining date");
                }
            }else{
                errorToast("Please select an image");
            }
        }else{
            errorToast("Please enter company name");
        }
    }
    
    const setWorkExpHooks = (name, img, jd, ed, desc)=>{
        setWorkExperienceName(name);
        setWorkExperienceImage(img);
        setWorkExperienceJoiningDate(jd);
        setWorkExperienceEndDate(ed);
        setWorkExperienceDescription(desc);
    }

    //RELEAVANT FUNCTIONS FOR PROJECTS
    const setImageProject = (e)=>{
        var input = e.target;
        var reader = new FileReader();
        reader.onload = function(){
            var dataUrl: string = reader.result as string;
            setProjectImage(dataUrl);
        }
        reader.readAsDataURL(input.files[0]);
    }

    const addProject = (index)=>{
        if(projectName!==""){
            if(projectImage!=="https://images.unsplash.com/photo-1600456899121-68eda5705257?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1125&q=80"){
                if(projectStartingDate!==undefined){
                    if(projectEndDate!==undefined){
                        if(projectDescription!==""){
                            if(projectLink!==""){
                                const projectObject = {
                                    name: projectName,
                                    image: projectImage,
                                    joinDate: projectStartingDate,
                                    endDate: projectEndDate,
                                    description: projectDescription,
                                    link: projectLink
                                };
                                if(index===-1){
                                    setProjects([...projects, projectObject]);
                                }else{
                                    const projectArray = projects;
                                    projectArray[index] = projectObject;
                                    setProjects(projectArray);
                                    setSelectedProject(-1);
                                }
                                
                                setProjectHooks("",
                                "https://images.unsplash.com/photo-1600456899121-68eda5705257?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1125&q=80",
                                undefined,
                                undefined,
                                "",
                                "")
                                successToast("Saved project successfully");
                            }else{
                                errorToast("Please enter project link");
                            }
                        }else{
                            errorToast("Please enter project description");
                        }
                    }else{
                        errorToast("Please select project end date");
                    }
                }else{
                    errorToast("Please select project starting date");
                }
            }else{
                errorToast("Please select an image");
            }
        }else{
            errorToast("Please enter project name");
        }
    }
    
    const setProjectHooks = (name, img, jd, ed, desc, link)=>{
        setProjectName(name);
        setProjectImage(img);
        setProjectStartingDate(jd);
        setProjectEndDate(ed);
        setProjectDescription(desc);
        setProjectLink(link);
    }

    //RELEAVANT FUNCTIONS FOR SKILLS
    const addSkill = ()=>{
        if(skillName!==""){
            setSkills([...skills,{name: skillName, rating: Number(skillValue)}]);
            setSkillName("");
            setSkillValue(50);
        }else{
            errorToast("Please enter skill name")
        }
    }

    const isSmall = useMediaQuery({
        query: '(max-width: 960px)'
    });

    return(
        <Layout darkTheme={false}>
            <div className={styles.edit_profile_page}>
            <div className={styles.all_content}>
                <h2 className={styles.main_heading}>Complete Profile</h2>
                <Grid className={styles.main_content} container>
                    {
                        !isSmall
                        ?
                        <Grid item xs={12} sm={12} md={4} lg={3}>
                            <Grid container
                            className={selectedStep==0?styles.step_selected:styles.step_not_selected}
                            onClick={()=>{setSelectedStep(0)}}>
                                <Grid className={styles.step_heading} item xs={10} sm={10} md={10} lg={10}>
                                    <p>Basic Information</p>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    {
                                        step>0
                                        ?
                                        <div>
                                            <CheckCircleOutlineOutlinedIcon style={{color:"#1bc47d",marginTop:"6px"}}>

                                            </CheckCircleOutlineOutlinedIcon>
                                        </div>
                                        :
                                        <div>

                                        </div>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container
                            className={selectedStep==1?styles.step_selected:styles.step_not_selected}
                            onClick={()=>{setSelectedStep(1)}}>
                                <Grid className={styles.step_heading} item xs={10} sm={10} md={10} lg={10}>
                                    <p>About Me</p>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    {
                                        step>1
                                        ?
                                        <div>
                                            <CheckCircleOutlineOutlinedIcon style={{color:"#1bc47d",marginTop:"6px"}}>

                                            </CheckCircleOutlineOutlinedIcon>
                                        </div>
                                        :
                                        <div>

                                        </div>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container
                            className={selectedStep==2?styles.step_selected:styles.step_not_selected}
                            onClick={()=>{setSelectedStep(2)}}>
                                <Grid className={styles.step_heading} item xs={10} sm={10} md={10} lg={10}>
                                    <p>Social Accounts</p>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    {
                                        step>2
                                        ?
                                        <div>
                                            <CheckCircleOutlineOutlinedIcon style={{color:"#1bc47d",marginTop:"6px"}}>

                                            </CheckCircleOutlineOutlinedIcon>
                                        </div>
                                        :
                                        <div>

                                        </div>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container
                            className={selectedStep==3?styles.step_selected:styles.step_not_selected}
                            onClick={()=>{setSelectedStep(3)}}>
                                <Grid className={styles.step_heading} item xs={10} sm={10} md={10} lg={10}>
                                    <p>Education</p>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    {
                                        step>3
                                        ?
                                        <div>
                                            <CheckCircleOutlineOutlinedIcon style={{color:"#1bc47d",marginTop:"6px"}}>

                                            </CheckCircleOutlineOutlinedIcon>
                                        </div>
                                        :
                                        <div>

                                        </div>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container
                            className={selectedStep==4?styles.step_selected:styles.step_not_selected}
                            onClick={()=>{setSelectedStep(4)}}>
                                <Grid className={styles.step_heading} item xs={10} sm={10} md={10} lg={10}>
                                    <p>Work Experience</p>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    {
                                        step>4
                                        ?
                                        <div>
                                            <CheckCircleOutlineOutlinedIcon style={{color:"#1bc47d",marginTop:"6px"}}>

                                            </CheckCircleOutlineOutlinedIcon>
                                        </div>
                                        :
                                        <div>

                                        </div>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container
                            className={selectedStep==5?styles.step_selected:styles.step_not_selected}
                            onClick={()=>{setSelectedStep(5)}}>
                                <Grid className={styles.step_heading} item xs={10} sm={10} md={10} lg={10}>
                                    <p>Projects</p>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    {
                                        step>5
                                        ?
                                        <div>
                                            <CheckCircleOutlineOutlinedIcon style={{color:"#1bc47d",marginTop:"6px"}}>

                                            </CheckCircleOutlineOutlinedIcon>
                                        </div>
                                        :
                                        <div>

                                        </div>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container
                            className={selectedStep==6?styles.step_selected:styles.step_not_selected}
                            onClick={()=>{setSelectedStep(6)}}>
                                <Grid className={styles.step_heading} item xs={10} sm={10} md={10} lg={10}>
                                    <p>Skills</p>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    {
                                        step>6
                                        ?
                                        <div>
                                            <CheckCircleOutlineOutlinedIcon style={{color:"#1bc47d",marginTop:"6px"}}>

                                            </CheckCircleOutlineOutlinedIcon>
                                        </div>
                                        :
                                        <div>

                                        </div>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container
                            className={selectedStep==7?styles.step_selected:styles.step_not_selected}
                            onClick={()=>{setSelectedStep(7)}}>
                                <Grid className={styles.step_heading} item xs={10} sm={10} md={10} lg={10}>
                                    <p>Club Membership</p>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    {
                                        step>7
                                        ?
                                        <div>
                                            <CheckCircleOutlineOutlinedIcon style={{color:"#1bc47d",marginTop:"6px"}}>

                                            </CheckCircleOutlineOutlinedIcon>
                                        </div>
                                        :
                                        <div>

                                        </div>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                        :<Grid item xs={12} sm={12} md={4} lg={3}>
                        <SwipeableDrawer
                    open={open}
                    onOpen={()=>{setOpen(true)}}
                    onClose={()=>{setOpen(false)}}
                    onBackdropClick={()=>{setOpen(false)}}
                    >
                        <div style={{padding:"10px"}}>
                            <Grid container
                            className={selectedStep==0?styles.step_selected:styles.step_not_selected}
                            onClick={()=>{setSelectedStep(0)}}>
                                <Grid className={styles.step_heading} item xs={10} sm={10} md={10} lg={10}>
                                    <p>Basic Information</p>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    {
                                        step>0
                                        ?
                                        <div>
                                            <CheckCircleOutlineOutlinedIcon style={{color:"#1bc47d",marginTop:"6px"}}>

                                            </CheckCircleOutlineOutlinedIcon>
                                        </div>
                                        :
                                        <div>

                                        </div>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container
                            className={selectedStep==1?styles.step_selected:styles.step_not_selected}
                            onClick={()=>{setSelectedStep(1)}}>
                                <Grid className={styles.step_heading} item xs={10} sm={10} md={10} lg={10}>
                                    <p>About Me</p>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    {
                                        step>1
                                        ?
                                        <div>
                                            <CheckCircleOutlineOutlinedIcon style={{color:"#1bc47d",marginTop:"6px"}}>

                                            </CheckCircleOutlineOutlinedIcon>
                                        </div>
                                        :
                                        <div>

                                        </div>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container
                            className={selectedStep==2?styles.step_selected:styles.step_not_selected}
                            onClick={()=>{setSelectedStep(2)}}>
                                <Grid className={styles.step_heading} item xs={10} sm={10} md={10} lg={10}>
                                    <p>Social Accounts</p>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    {
                                        step>2
                                        ?
                                        <div>
                                            <CheckCircleOutlineOutlinedIcon style={{color:"#1bc47d",marginTop:"6px"}}>

                                            </CheckCircleOutlineOutlinedIcon>
                                        </div>
                                        :
                                        <div>

                                        </div>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container
                            className={selectedStep==3?styles.step_selected:styles.step_not_selected}
                            onClick={()=>{setSelectedStep(3)}}>
                                <Grid className={styles.step_heading} item xs={10} sm={10} md={10} lg={10}>
                                    <p>Education</p>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    {
                                        step>3
                                        ?
                                        <div>
                                            <CheckCircleOutlineOutlinedIcon style={{color:"#1bc47d",marginTop:"6px"}}>

                                            </CheckCircleOutlineOutlinedIcon>
                                        </div>
                                        :
                                        <div>

                                        </div>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container
                            className={selectedStep==4?styles.step_selected:styles.step_not_selected}
                            onClick={()=>{setSelectedStep(4)}}>
                                <Grid className={styles.step_heading} item xs={10} sm={10} md={10} lg={10}>
                                    <p>Work Experience</p>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    {
                                        step>4
                                        ?
                                        <div>
                                            <CheckCircleOutlineOutlinedIcon style={{color:"#1bc47d",marginTop:"6px"}}>

                                            </CheckCircleOutlineOutlinedIcon>
                                        </div>
                                        :
                                        <div>

                                        </div>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container
                            className={selectedStep==5?styles.step_selected:styles.step_not_selected}
                            onClick={()=>{setSelectedStep(5)}}>
                                <Grid className={styles.step_heading} item xs={10} sm={10} md={10} lg={10}>
                                    <p>Projects</p>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    {
                                        step>5
                                        ?
                                        <div>
                                            <CheckCircleOutlineOutlinedIcon style={{color:"#1bc47d",marginTop:"6px"}}>

                                            </CheckCircleOutlineOutlinedIcon>
                                        </div>
                                        :
                                        <div>

                                        </div>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container
                            className={selectedStep==6?styles.step_selected:styles.step_not_selected}
                            onClick={()=>{setSelectedStep(6)}}>
                                <Grid className={styles.step_heading} item xs={10} sm={10} md={10} lg={10}>
                                    <p>Skills</p>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    {
                                        step>6
                                        ?
                                        <div>
                                            <CheckCircleOutlineOutlinedIcon style={{color:"#1bc47d",marginTop:"6px"}}>

                                            </CheckCircleOutlineOutlinedIcon>
                                        </div>
                                        :
                                        <div>

                                        </div>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container
                            className={selectedStep==7?styles.step_selected:styles.step_not_selected}
                            onClick={()=>{setSelectedStep(7)}}>
                                <Grid className={styles.step_heading} item xs={10} sm={10} md={10} lg={10}>
                                    <p>Club Membership</p>
                                </Grid>
                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                    {
                                        step>7
                                        ?
                                        <div>
                                            <CheckCircleOutlineOutlinedIcon style={{color:"#1bc47d",marginTop:"6px"}}>

                                            </CheckCircleOutlineOutlinedIcon>
                                        </div>
                                        :
                                        <div>

                                        </div>
                                    }
                                </Grid>
                            </Grid>
                        </div>
                    </SwipeableDrawer>
                    </Grid>
                    }
                    <Grid item xs={12} sm={12} md={8} lg={9} className={styles.step_content}>
                        {
                            selectedStep==0
                            ?
                            <div>
                                Basic Information
                                <br></br>
                                this div contains basic info related inputs
                            </div>
                            :
                            <div>
                            </div>
                        }
                        {
                            selectedStep==1
                            ?
                            <div>
                                About Me
                            </div>
                            :
                            <div>
                            </div>
                        }
                        {
                            selectedStep==2
                            ?
                            <div>
                                Social Accounts
                            </div>
                            :
                            <div>
                            </div>
                        }
                        {
                            selectedStep==3
                            ?
                            <div>
                                Education
                            </div>
                            :
                            <div>
                            </div>
                        }
                        {
                            selectedStep==4
                            ?
                            <div>
                                <h2 className={styles.step_content_heading}>Work Experience</h2>
                                <Grid container className={styles.input_container}>
                                    {
                                        isSmall
                                        ?
                                        <Grid item xs={12} sm={12} md={12} lg={12}>Enter details about your work experience</Grid>
                                        :
                                        <div></div>
                                    }
                                    <Grid item className={styles.step_content_side_section} xs={2} sm={2} md={3} lg={3}>
                                        {
                                            !isSmall
                                            ?
                                            <p className={styles.enter_details_heading}>Enter details about your work experience</p>
                                            :
                                            <p></p>
                                        }
                                        
                                        {workExperience.map((data,index)=>{
                                            return(
                                                <div style={{height:"50px"}}
                                                onClick={()=>{
                                                    setSelectedWorkExperience(index);
                                                    setWorkExpHooks(data.name,data.image,data.joinDate,data.endDate,data.description);
                                                }}>
                                                <div className={styles.step_content_section_button}>
                                                    <p className={styles.step_content_section_button_text}>
                                                        {index+1}
                                                    </p>
                                                </div>
                                                <br></br>
                                                </div>
                                            )
                                            })
                                        }
                                        <div className={styles.step_content_section_button}
                                        onClick = {()=>{
                                            if(selectedWorkExperience==-1){
                                                addWorkExperience(-1);
                                            }else{
                                                setSelectedWorkExperience(-1);
                                                setWorkExpHooks("",
                                                "https://images.unsplash.com/photo-1600456899121-68eda5705257?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1125&q=80",
                                                undefined,
                                                undefined,
                                                "");
                                            }
                                            }}>
                                            <p className={styles.step_content_section_button_text}>
                                                +
                                            </p>
                                        </div>
                                    </Grid>
                                    <Grid item className={styles.step_content_main} xs={10} sm={10} md={9} lg={9}>
                                        <Grid container>
                                            <Grid item className={styles.image_grid} xs={12} sm={12} md={6} lg={5}>
                                                <img src={workExperienceImage}
                                                className={styles.input_image}></img>
                                                <div className={styles.camera_icon}>
                                                    <label htmlFor="getFileWE"><CameraAltIcon></CameraAltIcon></label>
                                                    <input type="file" 
                                                    id="getFileWE" 
                                                    style={{display:"none"}}
                                                    accept="image/*"
                                                    onChange={(e)=>{setImageWE(e)}}></input>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={7}>
                                                <h3 className={styles.name_label}>
                                                    Company name<span style={{color:"red"}}>*</span>
                                                </h3>
                                                <input
                                                className={styles.name_input}
                                                placeholder="Enter company name"
                                                value={workExperienceName}
                                                onChange={(e)=>{setWorkExperienceName(e.target.value)}}>
                                                </input>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={5}>
                                                <h3 className={styles.date_label}>
                                                    Joining Date
                                                </h3>
                                                <TextField
                                                type="date"
                                                defaultValue="2020-03-02"
                                                className={classes.textField}
                                                onChange={(e)=>{setWorkExperienceJoiningDate(e.target.value)}}
                                                >
                                                </TextField>
                                                <h3 className={styles.date_label}>
                                                    End Date
                                                </h3>
                                                <TextField
                                                type="date"
                                                defaultValue="2020-03-02"
                                                className={classes.textField}
                                                disabled={workExperienceEndDate==="Currently Working"}
                                                onChange={(e)=>{setWorkExperienceEndDate(e.target.value)}}
                                                >
                                                </TextField>
                                                <br></br>
                                                <div className={styles.presently_working}
                                                onClick={()=>{
                                                    if(workExperienceEndDate!=="Currently Working")
                                                    setWorkExperienceEndDate("Currently Working");
                                                    else
                                                    setWorkExperienceEndDate(undefined);
                                                    }}>
                                                <span>Working presently</span>
                                                <span className={styles.presently_working_icon}><CheckCircleOutlineOutlinedIcon></CheckCircleOutlineOutlinedIcon></span>
                                                </div>
                                            </Grid>
                                            <Grid style={{position:"relative"}} item xs={12} sm={12} md={6} lg={7}>
                                                <h3 className={styles.date_label}>
                                                    Description
                                                </h3>
                                                <textarea 
                                                className={styles.description_input} 
                                                rows={8} 
                                                cols={30}
                                                value={workExperienceDescription}
                                                onChange={(e)=>{
                                                    if(e.target.value.length<=240)
                                                    setWorkExperienceDescription(e.target.value)
                                                }}></textarea>
                                                <p className={styles.word_length}>{workExperienceDescription.length}/240</p>
                                                {
                                                    selectedWorkExperience!==-1
                                                    ?
                                                    <div>
                                                        <div className={styles.save_and_next_button}
                                                        onClick={()=>{addWorkExperience(selectedWorkExperience)}}>
                                                            Update
                                                        </div>
                                                    </div>
                                                    :
                                                    <div></div>
                                                }
                                            </Grid>
                                            <Grid style={{marginTop:"40px"}} item xs={12} sm={12} md={6} lg={6}>
                                                <div className={styles.previous_button}
                                                onClick = {()=>{setSelectedStep(3)}}>
                                                    Previous
                                                </div>
                                            </Grid>
                                            <Grid style={{marginTop:"40px"}} item xs={12} sm={12} md={6} lg={6}>
                                                <div className={styles.save_and_next_button}
                                                onClick = {()=>{setSelectedStep(5);setStep(5)}}>
                                                    Save {"&"} next
                                                </div>
                                            </Grid>
                                        </Grid>
                                        
                                        
                                    </Grid>
                                </Grid>
                            </div>
                            :
                            <div>
                            </div>
                        }
                        {
                            selectedStep==5
                            ?
                            <div>
                                <h2 className={styles.step_content_heading}>Projects</h2>
                                <Grid container className={styles.input_container}>
                                    {
                                        isSmall
                                        ?
                                        <Grid item xs={12} sm={12}>Enter details about your projects</Grid>
                                        :
                                        <div></div>
                                    }
                                    <Grid item className={styles.step_content_side_section} xs={2} sm={2} md={3} lg={3}>
                                        {
                                            !isSmall
                                            ?
                                            <p className={styles.enter_details_heading}>Enter details about your projects</p>
                                            :
                                            <div></div>
                                        }
                                        {projects.map((data,index)=>{
                                            return(
                                                <div style={{height:"50px"}}
                                                onClick={()=>{
                                                    setSelectedProject(index);
                                                    setProjectHooks(data.name,data.image,data.joinDate,data.endDate,data.description,data.link);
                                                }}>
                                                <div className={styles.step_content_section_button}>
                                                    <p className={styles.step_content_section_button_text}>
                                                        {index+1}
                                                    </p>
                                                </div>
                                                <br></br>
                                                </div>
                                            )
                                            })
                                        }
                                        <div className={styles.step_content_section_button}
                                        onClick = {()=>{
                                            if(selectedProject==-1){
                                                addProject(-1);
                                            }else{
                                                setSelectedProject(-1);
                                                setProjectHooks("",
                                                "https://images.unsplash.com/photo-1600456899121-68eda5705257?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1125&q=80",
                                                undefined,
                                                undefined,
                                                "",
                                                "");
                                            }
                                            }}>
                                            <p className={styles.step_content_section_button_text}>
                                                +
                                            </p>
                                        </div>
                                    </Grid>
                                    <Grid item className={styles.step_content_main} xs={10} sm={10} md={9} lg={9}>
                                        <Grid container>
                                            <Grid item className={styles.image_grid} xs={12} sm={12} md={6} lg={5}>
                                                <img src={projectImage}
                                                className={styles.input_image}></img>
                                                <div className={styles.camera_icon}>
                                                    <label htmlFor="getFileWE"><CameraAltIcon></CameraAltIcon></label>
                                                    <input type="file" 
                                                    id="getFileWE" 
                                                    style={{display:"none"}}
                                                    accept="image/*"
                                                    onChange={(e)=>{setImageProject(e)}}></input>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={7}>
                                                <h3 className={styles.name_label}>
                                                    Project name<span style={{color:"red"}}>*</span>
                                                </h3>
                                                <input
                                                className={styles.name_input}
                                                placeholder="Enter project name"
                                                value={projectName}
                                                onChange={(e)=>{setProjectName(e.target.value)}}>
                                                </input>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={5}>
                                                <h3 className={styles.date_label}>
                                                    Starting Date
                                                </h3>
                                                <TextField
                                                type="date"
                                                defaultValue="2020-03-02"
                                                className={classes.textField}
                                                onChange={(e)=>{setProjectStartingDate(e.target.value)}}
                                                >
                                                </TextField>
                                                <h3 className={styles.date_label}>
                                                    End Date
                                                </h3>
                                                <TextField
                                                type="date"
                                                defaultValue="2020-03-02"
                                                className={classes.textField}
                                                disabled={projectEndDate==="Currently Working"}
                                                onChange={(e)=>{setProjectEndDate(e.target.value)}}
                                                >
                                                </TextField>
                                                <br></br>
                                                <div className={styles.presently_working}
                                                onClick={()=>{
                                                    if(projectEndDate!=="Currently Working")
                                                    setProjectEndDate("Currently Working");
                                                    else
                                                    setProjectEndDate(undefined);
                                                    }}>
                                                <span>Working presently</span>
                                                <span className={styles.presently_working_icon}><CheckCircleOutlineOutlinedIcon></CheckCircleOutlineOutlinedIcon></span>
                                                </div>
                                            </Grid>
                                            <Grid style={{position:"relative"}} item xs={12} sm={12} md={6} lg={7}>
                                                <h3 className={styles.date_label}>
                                                    Description
                                                </h3>
                                                <textarea 
                                                className={styles.description_input} 
                                                rows={8} 
                                                cols={30}
                                                value={projectDescription}
                                                onChange={(e)=>{
                                                    if(e.target.value.length<=240)
                                                    setProjectDescription(e.target.value)
                                                }}></textarea>
                                                <p className={styles.word_length}>{projectDescription.length}/240</p>
                                                <h3 className={styles.name_label}>
                                                    Project Link<span style={{color:"red"}}>*</span>
                                                </h3>
                                                <input
                                                className={styles.link_input}
                                                placeholder="Enter project link"
                                                value={projectLink}
                                                onChange={(e)=>{setProjectLink(e.target.value)}}>
                                                </input>
                                                {
                                                    selectedProject!==-1
                                                    ?
                                                    <div>
                                                        <div className={styles.save_and_next_button}
                                                        onClick={()=>{addProject(selectedProject)}}>
                                                            Update
                                                        </div>
                                                    </div>
                                                    :
                                                    <div></div>
                                                }
                                            </Grid>
                                            <Grid style={{marginTop:"40px"}} item xs={12} sm={12} md={6} lg={6}>
                                                <div className={styles.previous_button}
                                                onClick = {()=>{setSelectedStep(4)}}>
                                                    Previous
                                                </div>
                                            </Grid>
                                            <Grid style={{marginTop:"40px"}} item xs={12} sm={12} md={6} lg={6}>
                                                <div className={styles.save_and_next_button}
                                                onClick = {()=>{setSelectedStep(6);setStep(6)}}>
                                                    Save {"&"} next
                                                </div>
                                            </Grid>
                                        </Grid>
                                        
                                        
                                    </Grid>
                                </Grid>
                            </div>
                            :
                            <div>
                            </div>
                        }
                        {
                            selectedStep==6
                            ?
                            <div>
                                <h2 className={styles.step_content_heading}>Skills</h2>
                                <Grid container className={styles.input_container}>
                                    {
                                        isSmall
                                        ?
                                        <p className={styles.enter_details_heading}>Enter details about your skills</p>
                                        :
                                        <div></div>
                                    }
                                    <Grid item className={styles.step_content_side_section} xs={12} sm={12} md={3} lg={3}>
                                        {
                                            !isSmall
                                            ?
                                            <p className={styles.enter_details_heading}>Enter details about your skills</p>
                                            :
                                            <div></div>
                                        }
                                    </Grid>
                                    <Grid item className={styles.step_content_main} xs={12} sm={12} md={9} lg={9}>
                                        {
                                            skills.map((data,index)=>{
                                                return(
                                                    <Grid className={styles.skill_container} container>
                                                    <Grid item xs={10} sm={10} md={10} lg={10}>
                                                        <h3 className={styles.skill_name}>{data.name}</h3>
                                                        <PrettoSlider
                                                        onChange={(e,value)=>{
                                                            const skillArray = skills;
                                                            skillArray[index].rating = Number(value);
                                                            setSkills(skillArray);
                                                        }} defaultValue={data.rating} valueLabelDisplay="auto" aria-label="pretto slider"/>
                                                    </Grid>
                                                    <Grid item xs={2} sm={2} md={2} lg={2}>
                                                    <CancelOutlinedIcon 
                                                    style={{color:"#1bc47d",marginTop:"6px",cursor:"pointer"}}
                                                    onClick = {()=>{
                                                        setSkills(skills.filter((skill)=>(skill.name!=data.name)));
                                                    }}></CancelOutlinedIcon>
                                                    </Grid>
                                                </Grid>
                                                )
                                            })
                                        }
                                        <div>
                                            <Grid className={styles.skill_container} container>
                                                <Grid item xs={10} sm={10} md={10} lg={10}>
                                                    <input
                                                    className={styles.skill_input}
                                                    placeholder="Enter skill name"
                                                    onChange={(e)=>{setSkillName(e.target.value)}}
                                                    value={skillName}>
                                                    </input>
                                                    <PrettoSlider onChange={(e,v)=>{setSkillValue(Number(v))}} valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={20} />
                                                </Grid>
                                                <Grid item xs={2} sm={2} md={2} lg={2}>
                                                <CheckCircleOutlineOutlinedIcon 
                                                style={{color:"#1bc47d",marginTop:"6px",cursor:"pointer"}}
                                                onClick={()=>{
                                                    addSkill();
                                                }}></CheckCircleOutlineOutlinedIcon>
                                                </Grid>
                                            </Grid>
                                            
                                        </div>
                                        <div style={{width:"100%"}}>
                                        <div className={styles.add_skills_button}
                                        onClick={()=>{
                                            addSkill();
                                        }}>
                                            <p className={styles.add_skills_button_text}>
                                                +
                                            </p>
                                        </div>
                                        </div> 
                                        <Grid container>
                                        <Grid style={{marginTop:"40px"}} item xs={12} sm={12} md={6} lg={6}>
                                            <div className={styles.previous_button}
                                            onClick = {()=>{setSelectedStep(5)}}>
                                                Previous
                                            </div>
                                        </Grid>
                                        <Grid style={{marginTop:"40px"}} item xs={12} sm={12} md={6} lg={6}>
                                            <div className={styles.save_and_next_button}
                                            onClick = {()=>{setSelectedStep(7);setStep(7)}}>
                                                Save {"&"} next
                                            </div>
                                        </Grid> 
                                        </Grid>
                                    </Grid>
                                    
                                </Grid>
                            </div>
                            :
                            <div>
                            </div>
                        }
                        {
                            selectedStep==7
                            ?
                            <div>
                                <h2 className={styles.step_content_heading}>Technical Clubs Membership</h2>
                                <Grid container className={styles.input_container}>
                                    {
                                        isSmall
                                        ?
                                        <p className={styles.enter_details_heading}>Select the technical clubs you want to be member of</p>
                                        :
                                        <div></div>
                                    }
                                    <Grid item className={styles.step_content_side_section} xs={12} sm={12} md={3} lg={3}>
                                        {
                                            !isSmall
                                            ?
                                            <div>
                                            <p className={styles.enter_details_heading}>Select the technical clubs you want to be member of</p>
                                            <p className={styles.enter_details_heading}
                                            style={{marginTop:"400px"}}>
                                                Kindly read the <span className={styles.terms_and_conditions}>Club's Terms and Conditions</span> before joining any Technical Club
                                            </p>
                                            </div>
                                            :
                                            <div></div>
                                        }
                                    </Grid>
                                    <Grid item className={styles.step_content_main} xs={12} sm={12} md={9} lg={9}>
                                        {
                                            clubs.map((data)=>{
                                                return(
                                                    <Grid container className={styles.club_card}>
                                                        <Grid item xs={3} sm={3} md={2} lg={2}>
                                                            <img className={styles.club_image} src={"/img/default_img.png"}></img>
                                                        </Grid>
                                                        <Grid item style={{paddingTop:"5px"}} xs={6} sm={6} md={7} lg={7}>
                                                            <p className={styles.club_name}>{data.name}</p>
                                                        </Grid>
                                                        <Grid item className={styles.join_club} xs={3} sm={3} md={3} lg={3}
                                                        onClick={()=>{setClubs(clubs.map(c=>c.name===data.name?{...c,joined: !c.joined}:c))}}>
                                                            <span>
                                                                {data.joined===true
                                                                ?
                                                                    "Joined"
                                                                :
                                                                    "Join"
                                                                }
                                                            </span>
                                                            {
                                                                data.joined!==true
                                                                ?
                                                                <CheckCircleOutlineOutlinedIcon
                                                                className={styles.join_icon}></CheckCircleOutlineOutlinedIcon>
                                                                :
                                                                <CancelOutlinedIcon
                                                                className={styles.join_icon}></CancelOutlinedIcon>
                                                            }
                                                        </Grid>
                                                    </Grid>    
                                                )
                                            })
                                        }
                                        {
                                            isSmall
                                            ?
                                            <p className={styles.enter_details_heading} style={{marginLeft:"10px"}}>
                                                Kindly read the <span className={styles.terms_and_conditions}>Club's Terms and Conditions</span> before joining any Technical Club
                                            </p>
                                            :
                                            <div></div>
                                        }
                                        <Grid container>
                                        <Grid style={{marginTop:"40px"}} item xs={12} sm={12} md={6} lg={6}>
                                            <div className={styles.previous_button}
                                            onClick = {()=>{setSelectedStep(6)}}>
                                                Previous
                                            </div>
                                        </Grid>
                                        <Grid style={{marginTop:"40px"}} item xs={12} sm={12} md={6} lg={6}>
                                            <div className={styles.save_and_next_button}
                                            onClick = {()=>{setSelectedStep(7);setStep(7)}}>
                                                Save {"&"} next
                                            </div>
                                        </Grid> 
                                        </Grid>
                                    </Grid>
                                    
                                </Grid>
                            </div>
                            :
                            <div>
                            </div>
                        }
                    </Grid>
                </Grid>
                {
                    isSmall
                    ?
                    <div>
                        <MenuIcon
                        style={{
                            position:"fixed",
                            bottom:"25px",
                            left:"10px",
                            backgroundColor:"#767bfe",
                            borderRadius:"50%",
                            color:"white",
                            padding:"5px",
                            width:"40px",
                            height:"40px",
                            marginLeft:"10px",
                            marginTop:"10px",
                            cursor:"pointer"
                        }}
                        onClick={()=>{setOpen(true);console.log("Sda")}}>
                        </MenuIcon>
                    </div>
                    :
                    <div>
                    </div>
                }
            </div>
            </div>
        </Layout>
    )
}