
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProductDto: any) {
    return this.productService.create(createProductDto);
  }

  @Get()
  async findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('category') category?: string,
    @Query('search') search?: string,
  ) {
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    return this.productService.findAll(pageNum, limitNum, category, search);
  }

  @Get('categories')
  async getCategories() {
    return this.productService.getCategories();
  }

  @Get('featured')
  async getFeaturedProducts() {
    return this.productService.getFeaturedProducts();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() updateProductDto: any) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @Post(':id/reviews')
  @UseGuards(AuthGuard('jwt'))
  async addReview(
    @Param('id') id: string,
    @Body() reviewDto: any,
  ) {
    return this.productService.addReview(id, reviewDto);
  }

  @Get(':id/reviews')
  async getReviews(@Param('id') id: string) {
    return this.productService.getReviews(id);
  }
}
