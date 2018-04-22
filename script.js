//init Dropzone
Dropzone.options.dropzOne = {
    //accept file mime-type
    dictDefaultMessage: `ЗАГРУЗИТЬ ДАННЫЕ`,
    autoProcessQueue: true,
    autoQueue:true,
    init: function() {
        this.on('dragenter', function(event) {
            console.log('enter');
            document.getElementById('dropzOne').style.border = '5px dashed #80A6FF';
            document.getElementById('dropzOne').style.background = '#696969'
            document.getElementById('dropzOne').style.color = 'white';

        });
        this.on('dragover', function(event) {
            console.log('over');
            document.getElementById('dropzOne').style.border = '5px dashed #80A6FF';
            document.getElementById('dropzOne').style.background = '#696969';
            document.getElementById('dropzOne').style.color = 'white';
        });
        this.on('drop', function() {
            document.getElementById('dropzOne').style.border = '2px dashed #80A6FF';
            document.getElementById('dropzOne').style.background = ' #FFFFFF';
            document.getElementById('dropzOne').style.color = 'black';
        });
        this.on('dragleave', function() {
            document.getElementById('dropzOne').style.border = '2px dashed #80A6FF';
            document.getElementById('dropzOne').style.background = ' #FFFFFF';
            document.getElementById('dropzOne').style.color = 'black';
        });
        let mark = true;
        this.on("addedfile", function(file) {
        
        document.getElementsByClassName('dz-preview dz-file-preview')[0].remove()
        //this.processQueue(file);
        
        //this.processQueue()
        //var _this = this;
        //_this.removeAllFiles();
        });
    },
    accept: function(file, done) {
        console.log('done')
        document.getElementById('loaderDiv').style.display = 'none';
        swal({
              position: 'bottom',
              type: 'success',
              title: 'Файл успешно отправлен',
              showConfirmButton: false,
              timer: 1500
            })
        done();
   //this.removeFile(file);
  }

};