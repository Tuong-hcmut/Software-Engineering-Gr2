export const generalNotifications = [
    {
        en: "Detailed notification about general regulations when using the smart printing application.",
        vi: "Thông báo chi tiết về các quy định chung khi sử dụng ứng dụng in thông minh"
    },
    {
        en: "New features have been added to the smart printing application. Check them out now!",
        vi: "Các tính năng mới đã được thêm vào ứng dụng in thông minh. Hãy kiểm tra ngay!"
    },
    {
        en: "Updated every student's page balance. Please check your account to avoid any inconvenience.",
        vi: "Cập nhật số trang của mỗi sinh viên. Vui lòng kiểm tra tài khoản của bạn để tránh bất kỳ bất tiện nào."
    }
]
export type PrintJob = {
    id: string
    printerId: string
    copies: number
    location: string
    confirmTime: Date
    status: string
    studentId: string
}
export const printJobs: PrintJob[] = [
    {
        id: "1",
        printerId: "printer-001",
        copies: 2,
        location: "Library",
        confirmTime: new Date("2024-12-01T10:00:00Z"),
        status: "Completed",
        studentId: "1"
    },
    {
        id: "2",
        printerId: "printer-002",
        copies: 5,
        location: "Computer Lab",
        confirmTime: new Date("2024-12-02T11:30:00Z"),
        status: "Pending",
        studentId: "1"
    },
    {
        id: "3",
        printerId: "printer-003",
        copies: 1,
        location: "Office",
        confirmTime: new Date("2024-12-03T14:45:00Z"),
        status: "In Progress",
        studentId: "2"
    },
    {
        id: "4",
        printerId: "printer-004",
        copies: 3,
        location: "Dormitory",
        confirmTime: new Date("2024-12-04T09:15:00Z"),
        status: "Completed",
        studentId: "2"
    },
    {
        id: "5",
        printerId: "printer-005",
        copies: 4,
        location: "Library",
        confirmTime: new Date("2024-12-05T16:00:00Z"),
        status: "Cancelled",
        studentId: "1"
    }
];

export const paperSizes = ["A4", "A3", "A5"];

export type Printer = {id: string, location: string, status: string, type: string}

export const printers = [
    {
        id: "printer-001",
        location: "Library",
        status: "working",
        type: "laserPrinter"
    },
    {
        id: "printer-002",
        location: "Computer Lab",
        status: "stoppedWorking",
        type: "laserPrinter"
    },
    {
        id: "printer-003",
        location: "Office",
        status: "busy",
        type: "laserPrinter"
    },
    {
        id: "printer-004",
        location: "Dormitory",
        status: "working",
        type: "laserPrinter"
    },
    {
        id: "printer-005",
        location: "Library",
        status: "working",
        type: "laserPrinter"
    }
]