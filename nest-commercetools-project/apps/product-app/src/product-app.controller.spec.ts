import { Test, TestingModule } from '@nestjs/testing';
import { ProductAppController } from './product-app.controller';
import { ProductAppService } from './product-app.service';

describe('ProductAppController', () => {
  let productAppController: ProductAppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductAppController],
      providers: [ProductAppService],
    }).compile();

    productAppController = app.get<ProductAppController>(ProductAppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(productAppController.getTotalProducts());
    });
  });
});
