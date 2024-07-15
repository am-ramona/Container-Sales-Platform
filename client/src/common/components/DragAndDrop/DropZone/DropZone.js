import React, { useRef, useState, useEffect, createRef, useContext } from 'react';
import { CustomClearanceContext } from "../../../../context/CustomClearanceContext";
import { Upload, Delete, Edit } from '../../../../assets/icons';
import { Button } from "../../../styles";
import axios from 'axios';
import './DropZone.css';

export default function Dropzone({ bookingOrder = null }) {
    const fileInputRef = useRef();
    const dropContainerRef = useRef();
    const fileStatusBarRef = useRef();
    const modalImageRef = useRef();
    const modalRef = useRef();
    const progressRef = useRef();
    const uploadRef = useRef();
    const uploadModalRef = useRef();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [validFiles, setValidFiles] = useState([]);
    // const fileStatusBarRefArray = validFiles.map(data => ({id: data, ref: createRef()}));
    const [unsupportedFiles, setUnsupportedFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    console.log('booookingOrderrrrr', bookingOrder)
    // const { setCustomClearanceDocument,
    //     setPaymentProofDocument
    // } = useContext(CustomClearanceContext);

    // const[filename, setFilename] = useState([]);

    useEffect(() => {
        let filteredArr = selectedFiles.reduce((acc, current) => {
            const x = acc.find(item => item.name === current.name);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);
        console.log('filteredArr', filteredArr)
        setValidFiles([...filteredArr]);

        if (selectedFiles.length > 1) {
            selectedFiles.shift();
            setSelectedFiles(selectedFiles);
            setValidFiles(selectedFiles)
        }

    }, [selectedFiles]);

    const preventDefault = (e) => {
        e.preventDefault();
        // e.stopPropagation();
    }

    const dragOver = (e) => {
        preventDefault(e);
    }

    const dragEnter = (e) => {
        preventDefault(e);
    }

    const dragLeave = (e) => {
        preventDefault(e);
    }

    const fileDrop = (e) => {
        preventDefault(e);
        const files = e.dataTransfer.files;
        if (files.length) {
            dropContainerRef.current.style.display = 'none';
            handleFiles(files);
        }
    }

    const filesSelected = (e) => {
        console.log("fileStatusBarRef", e);
        console.log("fileInputRef", fileInputRef);
        if (fileInputRef.current.files.length) {
            handleFiles(fileInputRef.current.files);
        }
        dropContainerRef.current.style.display = 'none'
    }

    const fileInputClicked = (e) => {
        fileInputRef.current.click();
    }

    const handleFiles = (files) => {
        for (let i = 0; i < files.length; i++) {
            if (validateFile(files[i])) {
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
            } else {
                files[i]['invalid'] = true;
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
                setErrorMessage('File type not permitted');
                setUnsupportedFiles(prevArray => [...prevArray, files[i]]);
            }
        }
    }

    const validateFile = (file) => {
        const validTypes = ['image/jpeg',
            'image/jpg',
            'image/png',
            '.doc',
            '.docx',
            'txt',
            'application/msword',
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }

        return true;
    }

    const fileSize = (size) => {
        if (size === 0) {
            return '0 Bytes';
        }
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    const fileType = (fileName) => {
        return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) || fileName;
    }

    const removeFile = (name) => {
        const index = validFiles.findIndex(e => e.name === name);
        const index2 = selectedFiles.findIndex(e => e.name === name);
        const index3 = unsupportedFiles.findIndex(e => e.name === name);
        validFiles.splice(index, 1);
        selectedFiles.splice(index2, 1);
        setValidFiles([...validFiles]);
        setSelectedFiles([...selectedFiles]);
        if (index3 !== -1) {
            unsupportedFiles.splice(index3, 1);
            setUnsupportedFiles([...unsupportedFiles]);
        }
        dropContainerRef.current.style.display = 'grid'
    }

    // const openImageModal = (file) => {
    //     const reader = new FileReader();
    //     modalRef.current.style.display = "block";
    //     reader.readAsDataURL(file);
    //     reader.onload = function(e) {
    //         modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
    //     }
    // }

    const closeModal = () => {
        modalRef.current.style.display = "none";
        modalImageRef.current.style.backgroundImage = 'none';
    }

    const uploadFiles = async () => {
        // setCustomClearanceDocument("Uploaded");
        // setPaymentProofDocument("Uploaded");


        uploadModalRef.current.style.display = 'block';
        uploadRef.current.innerHTML = 'File(s) Uploading...';
        for (let i = 0; i < validFiles.length; i++) {
            console.log('uploadedFile', validFiles[i])
            const formData = new FormData();
            // formData.append('uploadFile', validFiles[i]);
            // var body = {
            //     "uploadFile" : validFiles[i],
            //     "docType" : 'test'
            // }
            //     formData.append(
            //     // "myFile",
            //     // this.state.selectedFile,
            //     // this.state.selectedFile.name
            //     body
            //   );

            // console.log('', validFiles[i])
            //     formData.append('file', validFiles[i]);
            formData.append('uploadFile', validFiles[i]);
            formData.append('docType', 'test')

            // Display the key/value pairs
            for (var pair of formData.entries()) {
                console.log("formData", pair[0] + ', ' + pair[1]);
            }

            // console.log('formData', formData)

            //         axios({
            // method: 'post',
            // url:  '/documents/orders/' + bookingOrder,
            // data: formData,
            // headers: {'Content-Type': 'multipart/form-data' }
            // })
            // .then(function (response) {
            //     //handle success
            //     console.log(response);
            // })
            // .catch(function (response) {
            //     //handle error
            //     console.log(response);
            // });

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            axios.post('/documents/orders/' + bookingOrder, formData, {
                onUploadProgress: (progressEvent) => {
                    const uploadPercentage = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
                    progressRef.current.innerHTML = `${uploadPercentage}%`;
                    progressRef.current.style.width = `${uploadPercentage}%`;

                    if (uploadPercentage === 100) {
                        uploadRef.current.innerHTML = 'File(s) Uploaded';
                        validFiles.length = 0;
                        setValidFiles([...validFiles]);
                        setSelectedFiles([...validFiles]);
                        setUnsupportedFiles([...validFiles]);
                    }
                },
            })
                .catch(() => {
                    uploadRef.current.innerHTML = `<span class="error">Error Uploading File(s)</span>`;
                    progressRef.current.style.backgroundColor = 'red';
                })
        }
    }

    const closeUploadModal = () => {
        uploadModalRef.current.style.display = 'none';
    }
    const [selectedFile, setSelectedFile] = useState(null)

    const onChangeHandler = (event) => {
        setSelectedFile(event.target.files[0])

        console.log(event.target.files[0])

    }
    const onClickHandler = () => {
        const data = new FormData()
        data.append('file', selectedFile)
        axios.post('/documents/orders/' + bookingOrder, data, {
            // receive two    parameter endpoint url ,form data
        }).then(res => { // then print response status
            console.log(res.statusText)
        })
    }

    // const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
  
    const [fileInfos, setFileInfos] = useState([]);

    const setProfilePhoto = (e) => {
        let file = e.target.files[0];
        if (!file) return;
        // if (file.size / 1024 / 1024 > 1) {
            //     return this.setState((prevState) => ({
            //         formValidationMessage: {
            //             ...prevState.formValidationMessage,
            //             image: `Maximum upload size: 1MB`,
            //         },
            //     }));
            // }

            // this.setState((prevState) => ({
            //     loaders: {
            //         ...prevState.loaders,
            //         imageLoader: true,
            //     },
            //     hasChanges: true
            // }));

            let reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onloadend = () => {
                // if (this.state.mode === EDIT) {
                let fd = new FormData();
                fd.append("file", file);
                fd.append('docType', 'test')
                axios.post('https://csp-int.digital-nonprod.aws.cld.cma-cgm.com/csp/logistic/document/v1/documents/orders/' + bookingOrder, fd, {
                    onUploadProgress: (progressEvent) => {
                        const uploadPercentage = Math.floor((progressEvent.loaded / progressEvent.total) * 100);
                        progressRef.current.innerHTML = `${uploadPercentage}%`;
                        progressRef.current.style.width = `${uploadPercentage}%`;

                        if (uploadPercentage === 100) {
                            uploadRef.current.innerHTML = 'File(s) Uploaded';
                            validFiles.length = 0;
                            setValidFiles([...validFiles]);
                            setSelectedFiles([...validFiles]);
                            setUnsupportedFiles([...validFiles]);
                        }
                    },
                })
                    .catch(() => {
                        uploadRef.current.innerHTML = `<span class="error">Error Uploading File(s)</span>`;
                        progressRef.current.style.backgroundColor = 'red';
                    })

                // axios.post(`/api/v1/image/${clientId}`, clientData)
                // .then(response=>response.data)
                //             addClientImage(this.state.clientId, fd)
                //                 .then(() => {
                //                     this.props.success({
                //                         ...successAlertOpts,
                //                         message: `Image updated Successfully`,
                //                     });
                //                     this.setState(() => ({
                //                         clientImage: reader.result,
                //                     }));
                //                 })
                //                 .catch((err) => {
                //                     this.props.error({
                //                         ...errorAlertOpts,
                //                         message: err.response
                //                             ? err.response.data.description
                //                             : "An error occurred, please try again later",
                //                     });
                //                 })
                // .then(() => {
                //     this.setState((prevState) => ({
                //         loaders: {
                //             ...prevState.loaders,
                //             imageLoader: false,
                //         },
                //     }));
                // });
                // } else
                //     this.setState((prevState) => ({
                //         formData: {
                //             ...prevState.formData,
                //             image: file,
                //         },
                //         loaders: {
                //             ...prevState.loaders,
                //             imageLoader: false,
                //         },
                //         clientImage: reader.result,
                //         formValidationMessage: {
                //             ...prevState.formValidationMessage,
                //             image: "",
                //         },
                //     }));
            };

        };


        return (<>
          
            <form action="" method="post" encType="multipart/form-data">
            <label>Input</label>
            <input
                id="file"
                type="file"
                name="file"
                accept={".png, .jpg, .jpeg"}
                onChange={setProfilePhoto}
                multiple={false}
            />
            {/* <div>
      {currentFile && (
        <div className="progress">
          <div
            className="progress-bar progress-bar-info progress-bar-striped"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: progress + "%" }}
          >
            {progress}%
          </div>
        </div>
      )}

      <label className="btn btn-default">
        <input type="file" onChange={selectFile} />
      </label>

      <button
        className="btn btn-success"
        disabled={!selectedFiles}
        onClick={upload}
      >
        Upload
      </button>

      <div className="alert alert-light" role="alert">
        {message}
      </div>

      <div className="card">
        <div className="card-header">List of Files</div>
        <ul className="list-group list-group-flush">
          {fileInfos &&
            fileInfos.map((file, index) => (
              <li className="list-group-item" key={index}>
                <a href={file.url}>{file.name}</a>
              </li>
            ))}
        </ul>
      </div>
    </div> */}
                {/* <div className="container">
                    <div className="drop-container"
                        ref={dropContainerRef}
                        onDragOver={dragOver}
                        onDragEnter={dragEnter}
                        onDragLeave={dragLeave}
                        onDrop={fileDrop}
                    >
                        <div className="upload-icon">
                            <Upload fill="#6284e3" style={{ width: 60, height: 60, margin: '0 auto' }} alt="Upload" />
                        </div>
                        <div className="drop-message">
                            Drag and Drop or
                            <label htmlFor="file-upload" className="custom-file-upload">
                                &nbsp;browse&nbsp;
                            </label>
                            <input id="file-upload"
                                className="file-input"
                                name="uploadFile"
                                key={Math.random()}
                                ref={fileInputRef}
                                type="file"
                                accept="image/png, image/jpeg, .jpg, .pdf, .doc, .docx"
                                onChange={filesSelected}
                            />
                            your files
                        </div>
                    </div>
                    <div className="file-display-container">
                        {
                            validFiles.map((data, i) =>
                                <div className="file-status-bar" ref={fileStatusBarRef} key={i}>
                                    {/* <div onClick={!data.invalid ? () => openImageModal(data) : () => removeFile(data.name)}> */}
                                    {/* <div>
                                        <div className="file-type">{fileType(data.name)}</div>
                                        <span className={`file-name ${data.invalid ? 'file-error' : ''}`}>{data.name}</span>
                                        <span className="file-size">({fileSize(data.size)})</span>
                                        {data.invalid && <span className='file-error-message'>({errorMessage})</span>}
                                        <div className="file-edit">
                                            <label htmlFor="file-upload" className="custom-file-upload" onClick={fileInputClicked}>
                                                <Edit fill="#04246a" style={{ width: 15, height: 15 }} alt="Edit" />
                                            </label>
                                        </div>
                                        <div className="file-remove" onClick={() => removeFile(data.name)}>
                                            <Delete fill="#e20101" style={{ width: 15, height: 15 }} alt="Delete" />
                                        </div>
                                    </div>

                                </div>
                            )
                        }
                        {unsupportedFiles.length === 0 && validFiles.length ?
                            <Button color="primary-blue" className="file-upload-btn" onClick={() => uploadFiles()}>Save</Button>
                            : ''
                        }
                        {unsupportedFiles.length ? <p>Please remove all unsupported files.</p> : ''}
                    </div> */}
                {/* </div> */} 
                <div className="modal" ref={modalRef}>
                    <div className="overlay"></div>
                    <span className="close" onClick={(() => closeModal())}>X</span>
                    <div className="modal-image" ref={modalImageRef}></div>
                </div>

                <div className="upload-modal" ref={uploadModalRef}>
                    <div className="overlay"></div>
                    <div className="close" onClick={(() => closeUploadModal())}>X</div>
                    <div className="progress-container">
                        <span ref={uploadRef}></span>
                        <div className="progress">
                            <div className="progress-bar" ref={progressRef}></div>
                        </div>
                    </div>
                </div>
            </form >
        </>
        )
    }
