const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve static files (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Metadata storage (using simple JSON files for persistence)
const DATA_FILE = 'data.json';
let data = {
    files: [],
    notes: [],
    reminders: []
};

// Load data from file
if (fs.existsSync(DATA_FILE)) {
    try {
        data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    } catch (e) {
        console.error("Error loading data file", e);
    }
}

function saveData() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// API Endpoints

app.get('/api', (req, res) => {
    res.json({ status: 'ok', message: 'simpleShare API is running' });
});

// Files
app.get('/api/files', (req, res) => {
    res.json(data.files);
});

app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    let type = 'document';
    const mime = req.file.mimetype;
    if (mime.startsWith('video/')) type = 'video';
    else if (mime.startsWith('audio/')) type = 'audio';
    else if (mime.startsWith('image/')) type = 'image';
    else if (mime === 'application/pdf') type = 'document';

    const fileInfo = {
        id: Date.now().toString(),
        name: req.file.originalname,
        filename: req.file.filename,
        size: formatBytes(req.file.size),
        sizeBytes: req.file.size,
        type: type,
        mime: mime,
        date: new Date().toLocaleDateString(),
        url: `/uploads/${req.file.filename}`
    };

    data.files.unshift(fileInfo);
    saveData();
    res.json(fileInfo);
});

app.delete('/api/delete/:id', (req, res) => {
    const fileIndex = data.files.findIndex(f => f.id === req.params.id);
    if (fileIndex > -1) {
        const file = data.files[fileIndex];
        const filePath = path.join(__dirname, 'uploads', file.filename);
        
        // Delete physical file
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        
        data.files.splice(fileIndex, 1);
        saveData();
        res.json({ success: true });
    } else {
        res.status(404).send('File not found');
    }
});

// Notes
app.get('/api/notes', (req, res) => {
    res.json(data.notes);
});

app.post('/api/notes', (req, res) => {
    data.notes = req.body;
    saveData();
    res.json({ success: true });
});

// Reminders
app.get('/api/reminders', (req, res) => {
    res.json(data.reminders);
});

app.post('/api/reminders', (req, res) => {
    data.reminders = req.body;
    saveData();
    res.json({ success: true });
});

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024, dm = 1, sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
