import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import csvParser, { CsvParser } from 'csv-parser';
import prisma from '../../../prisma/prisma';
export async function GET(request: Request) {
   
    try {
        const colleges = await prisma.college.findMany();
        return NextResponse.json({"college":colleges});
      } catch (error) {
        console.log(error)
        return NextResponse.json({ error: 'Error fetching colleges' });
      }
    } 
    export async function POST(req:Request) {
        const {id}=(await req.json())
        console.log(id)
        const coll=await prisma.college.findUnique({
            where:{
                id:id.id
            },
            include:{
                applications:{
                    include:{
                        user:true
                    }
                }
            }
         
        })
        return NextResponse.json({college:coll})
        
    }

// import { NextResponse } from 'next/server';
// import fs from 'fs';
// import path from 'path';
// import csvParser, { CsvParser } from 'csv-parser';
// import prisma from '../../../prisma/prisma';
// export async function GET(request: Request) {
//   try {
//     // Construct the file path to the CSV file in the public directory
//     const filePath = path.join(process.cwd(), 'public', 'college.csv');

//     // Check if the file exists
//     if (!fs.existsSync(filePath)) {
//       return NextResponse.json(
//         { error: 'CSV file not found' },
//         { status: 404 }
//       );
//     }

//     // Read the CSV file
//     const fileContent = await fs.promises.readFile(filePath, 'utf-8');
//     console.log(fileContent)
//     // Parse CSV content
//     const records = await new Promise<any[]>((resolve, reject) => {
//       const parsedRecords: any[] = [];
//       const parser = csvParser({
//         columns: true,
//         skip_empty_lines: true,
//         cast: (value, context) => {
//           // Convert degreeModes and courses to arrays
//           if (context.column === 'degreeModes' || context.column === 'courses') {
//             return value.split(';');
//           }
//           // Convert nirfRanking to number
//           if (context.column === 'nirfRanking') {
//             return parseInt(value, 10);
//           }
//           return value;
//         },
//       });

//       parser.on('readable', () => {
//         let record;
//         while ((record = parser.read()) !== null) {
//           parsedRecords.push(record);
//         }
//       });

//       parser.on('error', (err) => {
//         reject(err);
//       });

//       parser.on('end', () => {
//         resolve(parsedRecords);
//       });

//       parser.write(fileContent);
//       parser.end();
//     });
//     const collegesWithNullLocation = await prisma.college.findMany({
//         where: {
//           location: null,
//         },
//       });
      
//       collegesWithNullLocation.forEach((el)=>{
//         console.log(el.name)
//       })
//     const { searchParams } = new URL(request.url);
//     const page = parseInt(searchParams.get('page') ?? '1', 10);
//     const search = searchParams.get('search')?.toLowerCase() ?? '';

//     // Filter records if search parameter exists
//     let filteredRecords = records;
//     if (search) {
//       filteredRecords = records.filter(
//         (record) =>
//           record.name.toLowerCase().includes(search) ||
//           record.location.toLowerCase().includes(search)
//       );
//     }

 

//     return NextResponse.json({
//       data: paginatedRecords,
//       metadata: {
//         total: filteredRecords.length,
//         page,
//         limit,
//         totalPages: Math.ceil(filteredRecords.length / limit),
//       },
//     });
//   } catch (error: any) {
//     console.error('Failed to read colleges:', error);
//     if (error.code === 'ENOENT') {
//       return NextResponse.json(
//         { error: 'CSV file not found' },
//         { status: 404 }
//       );
//     }
//     return NextResponse.json(
//       { error: 'Failed to fetch colleges' },
//       { status: 500 }
//     );
//   }
// }
